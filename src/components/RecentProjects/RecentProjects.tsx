import { type FC, useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  ScrollArea,
  TextField,
  Actionable,
  Tooltip,
} from "reshaped";
import { NFIcon } from "../NFIcon/NFIcon";

interface Project {
  id: string;
  name: string;
  path: string;
  lastOpened: string;
  icon: string;
  pinned?: boolean;
}

// nerd font codepoints
const ICONS = {
  search: "",
  folder: "",
  pin: "󰤱",
  pin_filled: "󰐃",
  close: "󰅖",
  vba: "",
} as const;

// just to to test this app, im gonna add this, but at prod, this will be commented, and an ACTUAL project section will be loaded.
const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    name: "bromineos",
    path: "~/Projects/OSes/bromineos.pptm",
    lastOpened: "2 hours ago",
    icon: ICONS.vba,
    pinned: true,
  },
];

interface ProjectRowProps {
  project: Project;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onTogglePin: (id: string) => void;
  onRemove: (id: string) => void;
}

const ProjectRow: FC<ProjectRowProps> = ({
  project,
  isSelected,
  onSelect,
  onTogglePin,
  onRemove,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Actionable
      onClick={() => onSelect(project.id)}
      attributes={{
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onDoubleClick: () => {
          // todo: double-clicking should open the project via tauri-fs method
        },
      }}
      className="w-full"
    >
      <div
        className={`
          flex items-center gap-2.5 px-3 py-[7px] cursor-pointer
          transition-colors duration-75 rounded-[3px] mx-1
          ${isSelected ? "bg-ide-selected border-l-2 border-l-ide-selected-border" : "border-l-2 border-l-transparent"}
          ${!isSelected && isHovered ? "bg-ide-hover" : ""}
        `}
      >
        <NFIcon
          icon={project.icon}
          size="lg"
          className="text-ide-accent shrink-0"
        />

        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm text-ide-text truncate leading-tight font-medium">
            {project.name}
          </span>
          <span className="text-2xs text-ide-text-muted truncate leading-tight mt-px">
            {project.path}
          </span>
        </div>

        <div
          className={`
            flex items-center gap-0.5 shrink-0 transition-opacity duration-100
            ${isHovered || isSelected ? "opacity-100" : "opacity-0"}
          `}
        >
          <Tooltip text={project.pinned ? "Unpin project" : "Pin project"}>
            {(attributes) => (
              <button
                {...attributes}
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePin(project.id);
                }}
                className="p-0.5 rounded-sm hover:bg-ide-active text-ide-text-muted hover:text-ide-text transition-colors"
              >
                <NFIcon
                  icon={project.pinned ? ICONS.pin_filled : ICONS.pin}
                  size="xs"
                  className={project.pinned ? "text-ide-accent" : ""}
                />
              </button>
            )}
          </Tooltip>

          <Tooltip text="Remove from recent">
            {(attributes) => (
              <button
                {...attributes}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(project.id);
                }}
                className="p-0.5 rounded-sm hover:bg-ide-active text-ide-text-muted hover:text-ide-danger transition-colors"
              >
                <NFIcon icon={ICONS.close} size="xs" />
              </button>
            )}
          </Tooltip>
        </div>

        {!isHovered && !isSelected && (
          <span className="text-2xs text-ide-text-dimmed shrink-0 tabular-nums">
            {project.lastOpened}
          </span>
        )}
      </div>
    </Actionable>
  );
};

export const RecentProjects: FC = () => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [selectedId, setSelectedId] = useState<string>(MOCK_PROJECTS[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const handleTogglePin = useCallback((id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, pinned: !p.pinned } : p)),
    );
  }, []);

  const handleRemove = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const list = projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.path.toLowerCase().includes(q),
    );

    // pinned projects always appear first
    return [...list.filter((p) => p.pinned), ...list.filter((p) => !p.pinned)];
  }, [projects, searchQuery]);

  const pinnedCount = filtered.filter((p) => p.pinned).length;

  return (
    <View
      direction="column"
      height="100%"
      backgroundColor="elevation-base"
      className="border-r border-r-ide-border"
    >
      {/* heading */}
      <View paddingInline={3} paddingBlock={2}>
        <Text variant="body-2" weight="semibold" color="neutral">
          Projects
        </Text>
      </View>

      {/* search */}
      <View paddingInline={2} paddingBottom={1}>
        <TextField
          name="project-search"
          placeholder="Search projects..."
          variant="faded"
          size="small"
          onChange={({ value }) => setSearchQuery(value)}
          startSlot={
            <View paddingStart={2} align="center" justify="center">
              <NFIcon
                icon={ICONS.search}
                size="xs"
                className="text-ide-text-muted"
              />
            </View>
          }
        />
      </View>

      {/* project list */}
      <View grow>
        <ScrollArea scrollbarDisplay="hover" height="100%">
          <View direction="column" paddingBottom={2}>
            {pinnedCount > 0 && (
              <>
                <View paddingInline={3} paddingBlock={1}>
                  <Text
                    variant="caption-2"
                    color="neutral-faded"
                    weight="medium"
                  >
                    Pinned
                  </Text>
                </View>
                {filtered
                  .filter((p) => p.pinned)
                  .map((project) => (
                    <ProjectRow
                      key={project.id}
                      project={project}
                      isSelected={selectedId === project.id}
                      onSelect={setSelectedId}
                      onTogglePin={handleTogglePin}
                      onRemove={handleRemove}
                    />
                  ))}

                <View paddingInline={3} paddingBlock={1}>
                  <Text
                    variant="caption-2"
                    color="neutral-faded"
                    weight="medium"
                  >
                    Recent
                  </Text>
                </View>
              </>
            )}

            {filtered
              .filter((p) => !p.pinned)
              .map((project) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  isSelected={selectedId === project.id}
                  onSelect={setSelectedId}
                  onTogglePin={handleTogglePin}
                  onRemove={handleRemove}
                />
              ))}

            {filtered.length === 0 && (
              <View padding={4} align="center">
                <Text variant="caption-1" color="neutral-faded">
                  No projects found
                </Text>
              </View>
            )}
          </View>
        </ScrollArea>
      </View>
    </View>
  );
};
