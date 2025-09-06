import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";

const categories = [
  "Academic", "Technology", "Arts", "Sports", "Social", 
  "Volunteer", "Business", "Research", "Music", "Drama"
];

const skills = [
  "Programming", "Design", "Leadership", "Writing", "Public Speaking",
  "Marketing", "Research", "Event Planning", "Photography", "Music"
];

export const FilterSection = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSkills([]);
    setSearchTerm("");
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedSkills.length > 0 || searchTerm;

  return (
    <div className="bg-background border-b border-border  top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="flex gap-4 items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search clubs by name, description, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-12 px-6"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge variant="accent" className="ml-2 h-5 w-5 p-0 text-xs">
                {selectedCategories.length + selectedSkills.length}
              </Badge>
            )}
          </Button>

          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} className="h-12">
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="bg-muted rounded-lg p-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategories.includes(category) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Skills & Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium text-foreground">Active filters:</span>
                  {selectedCategories.map((category) => (
                    <Badge key={category} variant="accent" className="cursor-pointer" onClick={() => toggleCategory(category)}>
                      {category} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                  {selectedSkills.map((skill) => (
                    <Badge key={skill} variant="accent" className="cursor-pointer" onClick={() => toggleSkill(skill)}>
                      {skill} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};