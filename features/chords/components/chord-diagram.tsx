import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ChordTone } from "../types";
import { ChordGuitar } from "./chord-guitar";
import { ChordPiano } from "./chord-piano";

export const ChordDiagram = ({ notes }: { notes: ChordTone[] }) => {
  return (
    <Tabs defaultValue="piano">
      <TabsList className="w-full">
        <TabsTrigger value="piano">Piano</TabsTrigger>
        <TabsTrigger value="guitar">Guitar</TabsTrigger>
      </TabsList>
      <TabsContent value="piano" className="px-1 pt-1">
        <ChordPiano notes={notes} />
      </TabsContent>
      <TabsContent value="guitar" className="pt-1">
        <ChordGuitar notes={notes} />
      </TabsContent>
    </Tabs>
  );
};
