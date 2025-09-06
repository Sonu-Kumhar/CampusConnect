import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Calendar, Heart } from "lucide-react";

interface ClubCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  location: string;
  nextEvent: string;
  tags: string[];
  image?: string;
  isFavorited?: boolean;
}

export const ClubCard = ({
  name,
  description,
  category,
  memberCount,
  location,
  nextEvent,
  tags,
  image,
  isFavorited = false,
}: ClubCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-card hover:shadow-glow transition-smooth border border-border overflow-hidden group">
      {/* Header Image */}
      <div className="relative h-48 bg-gradient-card">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl font-bold text-primary/20">{name.charAt(0)}</div>
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 text-primary">
            {category}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className={`bg-white/90 hover:bg-white h-8 w-8 ${
              isFavorited ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            <Heart className="h-4 w-4" fill={isFavorited ? "currentColor" : "none"} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-smooth">
          {name}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            {memberCount} members
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            Next: {nextEvent}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 3} more
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button className="flex-1" variant="default">
            Join Club
          </Button>
          <Button variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};