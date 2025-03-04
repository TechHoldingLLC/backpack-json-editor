import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface League {
  id: string;
  logo_image: string;
  enabled: boolean;
  teams: {
    id: string;
    logo_image: string;
    enabled: boolean;
  }[];
}

interface AddLeagueButtonProps {
  onLeagueAdd: (league: League) => void;
}

export const AddLeagueButton = ({ onLeagueAdd }: AddLeagueButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newLeague, setNewLeague] = useState<League>({
    id: '',
    logo_image: '',
    enabled: true,
    teams: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLeagueAdd(newLeague);
    setIsOpen(false);
    setNewLeague({
      id: '',
      logo_image: '',
      enabled: true,
      teams: []
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add League
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New League</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="id">League ID</Label>
                <Input
                  id="id"
                  value={newLeague.id}
                  onChange={(e) => setNewLeague({ ...newLeague, id: e.target.value })}
                  placeholder="Enter league ID"
                  required
                />
              </div>
              <div>
                <Label htmlFor="logo">Logo Image Path</Label>
                <Input
                  id="logo"
                  value={newLeague.logo_image}
                  onChange={(e) => setNewLeague({ ...newLeague, logo_image: e.target.value })}
                  placeholder="Enter logo image path"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create League
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}; 