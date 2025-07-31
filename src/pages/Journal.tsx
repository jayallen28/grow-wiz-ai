import { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Plus, Calendar } from 'lucide-react';
import { AddJournalEntryModal } from '@/components/modals/AddJournalEntryModal';

interface JournalEntry {
  _id: string;
  title: string;
  content: string;
  date: string;
  tags?: string[];
}

const Journal = () => {
  const [showAddEntryModal, setShowAddEntryModal] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch('/api/journal');
        const data = await res.json();
        setEntries(data.entries);
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Grow Journal
          </h1>
          <p className="text-muted-foreground mt-1">
            Track daily progress and log important events
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Entries
                  </span>
                  <Button variant="cannabis" size="sm" onClick={() => setShowAddEntryModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Entry
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {entries.length > 0 ? (
                    entries.map((entry) => (
                      <div key={entry._id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{entry.title}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(entry.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {entry.content}
                        </p>
                        {entry.tags?.length > 0 && (
                          <div className="flex gap-2">
                            {entry.tags.map((tag, idx) => (
                              <span key={idx} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No journal entries yet...</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Water/Feed Plants
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Check Environment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Plant Training
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <AddJournalEntryModal
        open={showAddEntryModal}
        onOpenChange={setShowAddEntryModal}
      />
    </div>
  );
};

export default Journal;
