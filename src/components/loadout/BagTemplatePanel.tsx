"use client";

import { useDraggable } from "@dnd-kit/core";
import { BAG_TEMPLATES, formatVolume, type BagTemplate } from "./bag-templates";
import { BagShape } from "./BagShapes";

interface BagTemplatePanelProps {
  className?: string;
}

export function BagTemplatePanel({ className = "" }: BagTemplatePanelProps) {
  return (
    <div className={`flex flex-col h-full bg-[#0A0F1C] border-r border-white/[0.04] ${className}`}>
      <div className="px-4 py-3 border-b border-white/[0.04]">
        <h3 className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">
          Bag Types
        </h3>
        <p className="text-[9px] text-white/15 mt-0.5">Drag onto bike</p>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar-dark p-2 space-y-0.5">
        {BAG_TEMPLATES.map((template, i) => (
          <DraggableBagCard key={template.id} template={template} index={i} />
        ))}
      </div>
    </div>
  );
}

function DraggableBagCard({ template, index }: { template: BagTemplate; index: number }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `template-${template.id}`,
    data: { type: "bag-template", template },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-grab active:cursor-grabbing
        border border-transparent
        hover:bg-white/[0.04] hover:border-white/[0.06]
        transition-all duration-150 animate-fade-up
        ${isDragging ? "opacity-20 scale-95" : ""}
      `}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md bg-white/[0.02]">
        <BagShape shape={template.shape} color="#C8553D" opacity={0.5} size={24} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-medium text-white/70 truncate leading-tight">
          {template.name}
        </div>
        <div className="text-[9px] text-white/25 tabular-nums">
          {formatVolume(template.volumeMin)}&ndash;{formatVolume(template.volumeMax)} &middot; {(template.maxWeight / 1000).toFixed(1)}kg max
        </div>
      </div>
    </div>
  );
}
