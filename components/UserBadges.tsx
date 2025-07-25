"use client";
import React from "react";
import { Badge } from "./ui/badge";

interface UserBadgesProps {
  badges: string[];
}

export default function UserBadges({ badges }: UserBadgesProps) {
  if (!badges.length) return <p>No badges earned yet.</p>;

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge, index) => (
        <Badge key={index} variant="default">
          🏆 {badge}
        </Badge>
      ))}
    </div>
  );
}