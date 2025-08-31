import React, { useState, useEffect } from "react";
import { SupportTicket } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Ticket, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";

export default function MyTickets() {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTickets = async () => {
            setIsLoading(true);
            try {
                const fetchedTickets = await SupportTicket.list("-created_date");
                setTickets(fetchedTickets);
            } catch (error) {
                console.error("Failed to load support tickets:", error);
            }
            setIsLoading(false);
        };
        loadTickets();
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case "open": return <Badge className="bg-blue-100 text-blue-800">Open</Badge>;
            case "in_progress": return <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>;
            case "resolved": return <Badge className="bg-emerald-100 text-emerald-800">Resolved</Badge>;
            case "closed": return <Badge className="bg-slate-100 text-slate-800">Closed</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    };

    return (
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-emerald-600" />
                    My Support Tickets
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                ) : tickets.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        <CheckCircle className="w-12 h-12 mx-auto mb-4 text-emerald-500" />
                        <h3 className="text-lg font-semibold">No Tickets Found</h3>
                        <p>You're all clear! No support tickets have been created.</p>
                    </div>
                ) : (
                    <Accordion type="single" collapsible className="w-full">
                        {tickets.map(ticket => (
                            <AccordionItem value={ticket.id} key={ticket.id}>
                                <AccordionTrigger className="hover:bg-slate-50 px-4">
                                    <div className="flex-1 text-left">
                                        <p className="font-medium text-slate-900">{ticket.title}</p>
                                        <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                                            <span>#{ticket.id.slice(-6)}</span>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                <span>{format(new Date(ticket.created_date), "MMM d, yyyy")}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {getStatusBadge(ticket.status)}
                                </AccordionTrigger>
                                <AccordionContent className="p-4 bg-slate-50">
                                    <div className="space-y-4">
                                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{ticket.description}</p>
                                        {ticket.messages && ticket.messages.length > 0 && (
                                            <div className="border-t pt-4 space-y-3">
                                                <h4 className="font-semibold text-slate-800">Conversation History</h4>
                                                {ticket.messages.map((msg, index) => (
                                                    <div key={index} className={`text-sm p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-50' : 'bg-white'}`}>
                                                        <p className="font-bold capitalize text-slate-700">{msg.role}</p>
                                                        <p className="text-slate-600">{msg.content}</p>
                                                        <p className="text-xs text-slate-400 mt-1">{format(new Date(msg.timestamp), "MMM d, h:mm a")}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </CardContent>
        </Card>
    );
}