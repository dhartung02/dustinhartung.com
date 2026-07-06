// src/components/opsystem/WorkflowDiagram.tsx
import { diagramNodes, diagramEdges, diagramLegend } from "./content";

const markerColors: Record<string, string> = {
  cyan: "#22d3ee",
  amber: "#fbbf24",
  emerald: "#34d399",
  sky: "#38bdf8",
  rose: "#fb7185",
  teal: "#2dd4bf",
};

const groupStyles: Record<string, { fill: string; stroke: string; text: string }> = {
  context: { fill: "rgba(255,255,255,0.03)", stroke: "rgba(255,255,255,0.12)", text: "#94a3b8" },
  artifact: { fill: "rgba(34,211,238,0.06)", stroke: "rgba(34,211,238,0.35)", text: "#e2e8f0" },
  informed: { fill: "rgba(52,211,153,0.06)", stroke: "rgba(52,211,153,0.3)", text: "#e2e8f0" },
};

export default function WorkflowDiagram() {
  return (
    <div>
      <svg
        viewBox="0 0 960 340"
        className="h-auto w-full"
        role="img"
        aria-label="Workflow diagram: org structure, customer signals, and competitive intelligence feed the PRD Builder; the PRD, Objective, and Stories stay in sync with each other; Stories feed the Release Announcement Builder. Separately, PM Radar digests Slack and email into ticket candidates, and PM Jira Digest produces a weekly ticket digest."
      >
        <defs>
          {Object.entries(markerColors).map(([id, color]) => (
            <marker
              key={id}
              id={`arrow-${id}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill={color} />
            </marker>
          ))}
        </defs>

        {diagramEdges.map((edge) => (
          <path
            key={edge.id}
            d={edge.path}
            fill="none"
            stroke={edge.color}
            strokeWidth={1.5}
            strokeDasharray={edge.dashed ? "5,4" : undefined}
            markerEnd={`url(#arrow-${edge.markerId})`}
            markerStart={edge.bidirectional ? `url(#arrow-${edge.markerId})` : undefined}
            opacity={0.85}
          />
        ))}

        {diagramNodes.map((node) => {
          const style = groupStyles[node.group];
          return (
            <g key={node.id}>
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                rx={10}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth={1}
              />
              <text
                x={node.x + node.w / 2}
                y={node.y + node.h / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={style.text}
                fontSize={12}
                fontWeight={500}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {diagramLegend.map((item) => (
          <div key={item.skill} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <p className="text-[13px] leading-6 text-slate-300">
              <span className="font-semibold text-slate-100">{item.skill}</span> — {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
