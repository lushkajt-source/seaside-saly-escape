import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, LogOut, Search, CalendarDays, Users, CheckCircle, XCircle, Clock, Plus } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Booking {
  id: string;
  guest_name: string;
  guest_email: string | null;
  phone: string | null;
  check_in: string;
  check_out: string;
  guests_count: number | null;
  room_type: string | null;
  room_id: string;
  status: string;
  special_request: string | null;
  decline_reason: string | null;
  created_at: string;
  created_by: string | null;
  confirmed_by: string | null;
  source: string | null;
}

interface Room {
  id: string;
  name: string;
  slug: string;
}

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: "hsl(38 55% 55% / 0.2)", text: "hsl(38 55% 55%)" },
  confirmed: { bg: "hsl(142 50% 40% / 0.2)", text: "hsl(142 50% 50%)" },
  declined: { bg: "hsl(0 70% 50% / 0.2)", text: "hsl(0 70% 55%)" },
  cancelled: { bg: "hsl(0 70% 50% / 0.2)", text: "hsl(0 70% 55%)" },
};

const EmployeeDashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth(false, "employee");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelBooking, setCancelBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [newBookingOpen, setNewBookingOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({
    guest_name: "", guest_email: "", phone: "", check_in: "", check_out: "",
    guests_count: "1", room_id: "", special_request: "",
  });
  const [creating, setCreating] = useState(false);

  const fetchBookings = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load bookings");
    } else {
      // Client-side filter for employee's own bookings (RLS also enforces this)
      setBookings((data as any as Booking[]) || []);
    }
    setLoading(false);
  };

  const fetchRooms = async () => {
    const { data } = await supabase.from("rooms").select("id, name, slug");
    if (data) setRooms(data);
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
      fetchRooms();
    }
  }, [user]);

  const sendEmail = async (type: string, booking: Booking) => {
    try {
      await supabase.functions.invoke("send-booking-email", {
        body: { type, booking },
      });
    } catch (err) {
      console.error("Email send failed:", err);
    }
  };

  const updateStatus = async (id: string, newStatus: string, reason?: string) => {
    setUpdatingId(id);
    const updateData: any = { status: newStatus };
    if (reason) updateData.decline_reason = reason;
    if (newStatus === "confirmed" && user) {
      updateData.confirmed_by = user.id;
    }

    const { error } = await supabase
      .from("bookings")
      .update(updateData)
      .eq("id", id);

    if (error) {
      toast.error("Failed to update booking");
    } else {
      toast.success(`Booking ${newStatus}`);
      const updatedBooking = bookings.find((b) => b.id === id);
      if (updatedBooking) {
        const bookingWithUpdate = { ...updatedBooking, status: newStatus, decline_reason: reason || null };
        if (newStatus === "confirmed") sendEmail("confirmed", bookingWithUpdate);
        else if (newStatus === "cancelled") sendEmail("cancelled", bookingWithUpdate);
      }
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id
            ? { ...b, status: newStatus, decline_reason: reason || b.decline_reason, confirmed_by: newStatus === "confirmed" && user ? user.id : b.confirmed_by }
            : b
        )
      );
    }
    setUpdatingId(null);
  };

  const canCancelBooking = (booking: Booking): boolean => {
    return booking.confirmed_by === user?.id;
  };

  const handleCancel = () => {
    if (!cancelBooking || !cancelReason.trim()) {
      toast.error("Please enter a reason for cancellation");
      return;
    }
    updateStatus(cancelBooking.id, "cancelled", cancelReason.trim());
    setCancelDialogOpen(false);
    setCancelBooking(null);
    setCancelReason("");
  };

  const handleCreateBooking = async () => {
    if (!newBooking.guest_name || !newBooking.check_in || !newBooking.check_out || !newBooking.room_id) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (new Date(newBooking.check_in) < new Date(new Date().toDateString())) {
      toast.error("Check-in date cannot be in the past");
      return;
    }
    if (new Date(newBooking.check_out) <= new Date(newBooking.check_in)) {
      toast.error("Check-out must be after check-in");
      return;
    }

    setCreating(true);
    const room = rooms.find(r => r.id === newBooking.room_id);
    const { error } = await supabase.from("bookings").insert({
      guest_name: newBooking.guest_name,
      guest_email: newBooking.guest_email || null,
      phone: newBooking.phone || null,
      check_in: newBooking.check_in,
      check_out: newBooking.check_out,
      guests_count: parseInt(newBooking.guests_count) || 1,
      room_id: newBooking.room_id,
      room_type: room?.name || null,
      special_request: newBooking.special_request || null,
      status: "confirmed",
      created_by: user!.id,
      confirmed_by: user!.id,
      source: "reception",
    });

    if (error) {
      toast.error("Failed to create booking");
    } else {
      toast.success("Booking created and auto-confirmed!");
      setNewBookingOpen(false);
      setNewBooking({ guest_name: "", guest_email: "", phone: "", check_in: "", check_out: "", guests_count: "1", room_id: "", special_request: "" });
      fetchBookings();
    }
    setCreating(false);
  };

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch = !searchTerm ||
        b.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.guest_email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchesStatus = statusFilter === "all" || b.status === statusFilter;
      const matchesDate = !dateFilter || format(new Date(b.created_at), "yyyy-MM-dd") === dateFilter;
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [bookings, searchTerm, statusFilter, dateFilter]);

  const stats = useMemo(() => ({
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    declined: bookings.filter((b) => b.status === "declined" || b.status === "cancelled").length,
  }), [bookings]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(30 10% 12%)" }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: "hsl(38 55% 55%)" }} />
      </div>
    );
  }

  const cardStyle = { background: "hsl(30 10% 18%)", border: "1px solid hsl(30 10% 25%)" };
  const goldText = { color: "hsl(38 55% 55%)" };
  const lightText = { color: "hsl(40 30% 85%)" };
  const mutedText = { color: "hsl(30 10% 55%)" };
  const inputStyle = { background: "hsl(30 10% 22%)", color: "hsl(40 30% 85%)" };

  return (
    <div className="min-h-screen" style={{ background: "hsl(30 10% 12%)" }}>
      {/* Header */}
      <div className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: "hsl(30 10% 20%)", background: "hsl(30 10% 15%)" }}>
        <h1 className="text-2xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif", ...goldText }}>
          Hotel Saly — Employee Panel
        </h1>
        <div className="flex gap-2">
          <Button onClick={() => setNewBookingOpen(true)} className="text-white border-none" style={{ background: "hsl(142 50% 35%)" }}>
            <Plus className="w-4 h-4 mr-2" /> New Booking
          </Button>
          <Button variant="ghost" onClick={signOut} style={{ color: "hsl(30 10% 55%)" }}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total", value: stats.total, icon: CalendarDays, color: "hsl(38 55% 55%)" },
            { label: "Pending", value: stats.pending, icon: Clock, color: "hsl(38 55% 55%)" },
            { label: "Confirmed", value: stats.confirmed, icon: CheckCircle, color: "hsl(142 50% 50%)" },
            { label: "Declined", value: stats.declined, icon: XCircle, color: "hsl(0 70% 55%)" },
          ].map((s) => (
            <Card key={s.label} className="border-none" style={cardStyle}>
              <CardContent className="p-5 flex items-center gap-4">
                <s.icon className="w-8 h-8" style={{ color: s.color }} />
                <div>
                  <p className="text-2xl font-bold" style={lightText}>{s.value}</p>
                  <p className="text-xs uppercase tracking-wider" style={mutedText}>{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={mutedText} />
            <Input placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 border-none" style={inputStyle} />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-44 border-none" style={inputStyle}>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent style={{ background: "hsl(30 10% 18%)", color: "hsl(40 30% 85%)", border: "1px solid hsl(30 10% 25%)" }}>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="w-full md:w-44 border-none" style={inputStyle} />
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin" style={goldText} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" style={mutedText}>
            <Users className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No bookings found</p>
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden" style={{ border: "1px solid hsl(30 10% 22%)" }}>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow style={{ background: "hsl(30 10% 16%)", borderColor: "hsl(30 10% 22%)" }}>
                    {["Guest", "Email", "Phone", "Check-in", "Check-out", "Guests", "Room", "Source", "Status", "Actions"].map((h) => (
                      <TableHead key={h} style={{ ...goldText, fontWeight: 600, letterSpacing: "0.05em", fontSize: "0.7rem", textTransform: "uppercase" }}>{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((b) => (
                    <TableRow key={b.id} style={{ background: "hsl(30 10% 14%)", borderColor: "hsl(30 10% 20%)" }} className="transition-colors hover:!bg-[hsl(30,10%,17%)]">
                      <TableCell style={lightText} className="font-medium">
                        {b.guest_name}
                        {b.special_request && (
                          <p className="text-[10px] mt-0.5 truncate max-w-[120px]" style={mutedText} title={b.special_request}>💬 {b.special_request}</p>
                        )}
                      </TableCell>
                      <TableCell style={mutedText} className="text-xs">{b.guest_email || "—"}</TableCell>
                      <TableCell style={mutedText} className="text-xs">{b.phone || "—"}</TableCell>
                      <TableCell style={lightText} className="text-xs">{format(new Date(b.check_in), "MMM d, yyyy")}</TableCell>
                      <TableCell style={lightText} className="text-xs">{format(new Date(b.check_out), "MMM d, yyyy")}</TableCell>
                      <TableCell style={lightText} className="text-center">{b.guests_count || 1}</TableCell>
                      <TableCell style={mutedText} className="text-xs">{b.room_type || "—"}</TableCell>
                      <TableCell>
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase" style={{ background: "hsl(30 10% 22%)", color: "hsl(30 10% 60%)" }}>
                          {b.source || "website"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize" style={{ background: statusColors[b.status]?.bg || statusColors.pending.bg, color: statusColors[b.status]?.text || statusColors.pending.text }}>
                          {b.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {b.status === "pending" && b.created_by === user?.id && (
                            <Button size="sm" disabled={updatingId === b.id} onClick={() => updateStatus(b.id, "confirmed")} className="text-xs border-none text-white" style={{ background: "hsl(142 50% 35%)" }}>
                              {updatingId === b.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Confirm"}
                            </Button>
                          )}
                          {b.status === "confirmed" && canCancelBooking(b) && (
                            <Button size="sm" variant="ghost" disabled={updatingId === b.id} onClick={() => { setCancelBooking(b); setCancelReason(""); setCancelDialogOpen(true); }} className="text-xs" style={{ color: "hsl(0 70% 55%)", background: "hsl(0 70% 50% / 0.1)" }}>
                              {updatingId === b.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Cancel"}
                            </Button>
                          )}
                          {(b.status === "declined" || b.status === "cancelled") && (
                            <span className="text-xs" style={mutedText}>—</span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent style={{ background: "hsl(30 10% 18%)", border: "1px solid hsl(30 10% 25%)", color: "hsl(40 30% 85%)" }}>
          <DialogHeader>
            <DialogTitle style={goldText}>Cancel Booking</DialogTitle>
            <DialogDescription style={mutedText}>
              Please provide a reason for cancelling {cancelBooking?.guest_name}'s reservation.
            </DialogDescription>
          </DialogHeader>
          <Textarea value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} placeholder="Enter the reason..." className="border-none min-h-[100px]" style={inputStyle} />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setCancelDialogOpen(false)} style={{ color: "hsl(30 10% 55%)" }}>Go Back</Button>
            <Button onClick={handleCancel} disabled={!cancelReason.trim() || updatingId === cancelBooking?.id} style={{ background: "hsl(0 70% 45%)", color: "white", border: "none" }}>
              {updatingId === cancelBooking?.id ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : null}
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Booking Dialog */}
      <Dialog open={newBookingOpen} onOpenChange={setNewBookingOpen}>
        <DialogContent style={{ background: "hsl(30 10% 18%)", border: "1px solid hsl(30 10% 25%)", color: "hsl(40 30% 85%)" }} className="max-w-lg">
          <DialogHeader>
            <DialogTitle style={goldText}>New Booking (Reception)</DialogTitle>
            <DialogDescription style={mutedText}>Create a booking on behalf of a guest. It will be auto-confirmed.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label style={goldText}>Guest Name *</Label>
              <Input value={newBooking.guest_name} onChange={(e) => setNewBooking(p => ({ ...p, guest_name: e.target.value }))} className="border-none" style={inputStyle} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label style={goldText}>Email</Label>
                <Input type="email" value={newBooking.guest_email} onChange={(e) => setNewBooking(p => ({ ...p, guest_email: e.target.value }))} className="border-none" style={inputStyle} />
              </div>
              <div>
                <Label style={goldText}>Phone</Label>
                <Input value={newBooking.phone} onChange={(e) => setNewBooking(p => ({ ...p, phone: e.target.value }))} className="border-none" style={inputStyle} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label style={goldText}>Check-in *</Label>
                <Input type="date" value={newBooking.check_in} onChange={(e) => setNewBooking(p => ({ ...p, check_in: e.target.value }))} className="border-none" style={inputStyle} />
              </div>
              <div>
                <Label style={goldText}>Check-out *</Label>
                <Input type="date" value={newBooking.check_out} onChange={(e) => setNewBooking(p => ({ ...p, check_out: e.target.value }))} className="border-none" style={inputStyle} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label style={goldText}>Room *</Label>
                <Select value={newBooking.room_id} onValueChange={(v) => setNewBooking(p => ({ ...p, room_id: v }))}>
                  <SelectTrigger className="border-none" style={inputStyle}><SelectValue placeholder="Select room" /></SelectTrigger>
                  <SelectContent style={{ background: "hsl(30 10% 18%)", color: "hsl(40 30% 85%)", border: "1px solid hsl(30 10% 25%)" }}>
                    {rooms.map(r => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label style={goldText}>Guests</Label>
                <Input type="number" min="1" value={newBooking.guests_count} onChange={(e) => setNewBooking(p => ({ ...p, guests_count: e.target.value }))} className="border-none" style={inputStyle} />
              </div>
            </div>
            <div>
              <Label style={goldText}>Special Request</Label>
              <Textarea value={newBooking.special_request} onChange={(e) => setNewBooking(p => ({ ...p, special_request: e.target.value }))} className="border-none" style={inputStyle} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setNewBookingOpen(false)} style={{ color: "hsl(30 10% 55%)" }}>Cancel</Button>
            <Button onClick={handleCreateBooking} disabled={creating} className="text-white border-none" style={{ background: "linear-gradient(135deg, hsl(38 55% 55%), hsl(38 45% 40%))" }}>
              {creating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Create Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeDashboard;
