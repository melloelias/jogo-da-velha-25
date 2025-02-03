import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This would come from a database in a real app
const mockRanking = [
  { id: 1, winner: "John", date: "2024-03-20", time: "14:30" },
  { id: 2, winner: "Alice", date: "2024-03-20", time: "15:45" },
  { id: 3, winner: "Bob", date: "2024-03-19", time: "16:20" },
];

const Ranking = () => {
  const [search, setSearch] = useState("");

  const filteredRanking = mockRanking.filter((entry) =>
    entry.winner.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span>Winners Ranking</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search winners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Winner</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRanking.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <Trophy className="w-4 h-4 text-yellow-500" />
                    </TableCell>
                    <TableCell className="font-medium">{entry.winner}</TableCell>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Ranking;