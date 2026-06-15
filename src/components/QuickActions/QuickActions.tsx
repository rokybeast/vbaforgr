import type { FC } from "react";
import { View, Text, Actionable, Divider, Tooltip } from "reshaped";
import { NFIcon } from "../NFIcon/NFIcon";

// nf icons
const ICONS = {
  new_project: "󰐕",
  open: "󰏌",
  vcs: "",
  terminal: "",
  plugins: "",
  settings: "󰒓",
  docs: "󰈙",
  keyboard: "󰌌",
  whats_new: "󰎔",
  arrow_right: "󰁔",
} as const;

interface QuickActionItem {
  id: string;
  label: string;
  icon: string;
  description?: string;
  shortcut?: string;
  onClick?: () => void;
}

const primaryActions: QuickActionItem[] = [
  {
    id: "new-project",
    label: "New Project",
    icon: ICONS.new_project,
    description: "Create a new PPT(VBA) from a template",
    shortcut: "Ctrl+Shift+N",
  },
  {
    id: "open",
    label: "Open",
    icon: ICONS.open,
    description: "Open an existing .pptm or any VBA File",
    shortcut: "Ctrl+O",
  },
  {
    id: "vcs",
    label: "Get from VCS",
    icon: ICONS.vcs,
    description: "Clone a repository from Git, GitHub, or other VCS",
  },
];

const secondaryActions: QuickActionItem[] = [
  {
    id: "terminal",
    label: "Open Terminal",
    icon: ICONS.terminal,
    shortcut: "Ctrl+`",
  },
  {
    id: "plugins",
    label: "Plugins",
    icon: ICONS.plugins,
    description: "Browse and install extensions",
  },
  {
    id: "settings",
    label: "Settings",
    icon: ICONS.settings,
    shortcut: "Ctrl+Alt+S",
  },
];

const learnActions: QuickActionItem[] = [
  {
    id: "docs",
    label: "Documentation",
    icon: ICONS.docs,
  },
  {
    id: "shortcuts",
    label: "Keyboard Shortcuts",
    icon: ICONS.keyboard,
  },
  {
    id: "whats-new",
    label: "What's New",
    icon: ICONS.whats_new,
  },
];

interface ActionButtonProps {
  action: QuickActionItem;
  variant: "primary" | "secondary" | "link";
}

const ActionButton: FC<ActionButtonProps> = ({ action, variant }) => {
  if (variant === "primary") {
    return (
      <Actionable onClick={action.onClick} className="w-full group">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-ide-hover transition-colors duration-75 cursor-pointer">
          <div className="w-8 h-8 rounded-md bg-ide-accent/10 flex items-center justify-center shrink-0 group-hover:bg-ide-accent/20 transition-colors">
            <NFIcon icon={action.icon} size="lg" className="text-ide-accent" />
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm text-ide-text font-medium leading-tight">
              {action.label}
            </span>
            {action.description && (
              <span className="text-2xs text-ide-text-muted leading-tight mt-px truncate">
                {action.description}
              </span>
            )}
          </div>

          {action.shortcut && (
            <kbd className="text-2xs text-ide-text-dimmed bg-ide-panel-alt px-1.5 py-0.5 rounded border border-ide-border-subtle font-mono shrink-0">
              {action.shortcut}
            </kbd>
          )}

          <NFIcon
            icon={ICONS.arrow_right}
            size="xs"
            className="text-ide-text-dimmed opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
          />
        </div>
      </Actionable>
    );
  }

  if (variant === "secondary") {
    return (
      <Tooltip text={action.description || action.label}>
        {(attributes) => (
          <Actionable
            onClick={action.onClick}
            className="group"
            attributes={attributes}
          >
            <div className="flex items-center gap-2.5 px-2.5 py-[6px] rounded hover:bg-ide-hover transition-colors duration-75 cursor-pointer">
              <NFIcon
                icon={action.icon}
                size="sm"
                className="text-ide-text-muted group-hover:text-ide-text transition-colors"
              />
              <span className="text-sm text-ide-text-muted group-hover:text-ide-text transition-colors flex-1">
                {action.label}
              </span>
              {action.shortcut && (
                <kbd className="text-2xs text-ide-text-dimmed font-mono shrink-0">
                  {action.shortcut}
                </kbd>
              )}
            </div>
          </Actionable>
        )}
      </Tooltip>
    );
  }

  // link variant
  return (
    <Actionable onClick={action.onClick} className="group">
      <div className="flex items-center gap-2 px-2 py-[5px] rounded hover:bg-ide-hover transition-colors duration-75 cursor-pointer">
        <NFIcon
          icon={action.icon}
          size="xs"
          className="text-ide-text-dimmed group-hover:text-ide-accent transition-colors"
        />
        <span className="text-xs text-ide-text-muted group-hover:text-ide-accent transition-colors">
          {action.label}
        </span>
      </div>
    </Actionable>
  );
};

export const QuickActions: FC = () => {
  return (
    <View
      direction="column"
      gap={0}
      height="100%"
      padding={6}
      className="flex items-center justify-center"
    >
      <div className="w-full max-w-[420px]">
        <div className="mb-8">
          <div className="flex items-baseline gap-2 mb-1">
            <Text variant="featured-3" weight="bold" color="neutral">
              vbaForgr
            </Text>
            <Text variant="caption-1" color="neutral-faded">
              v0.1.0
            </Text>
          </div>
          <Text variant="caption-1" color="neutral-faded">
            Welcome back. Open a project or start fresh.
          </Text>
        </div>

        {/* primary actions */}
        <div className="mb-5">
          <View direction="column" gap={0}>
            {primaryActions.map((action) => (
              <ActionButton key={action.id} action={action} variant="primary" />
            ))}
          </View>
        </div>

        <Divider color="neutral-faded" />

        {/* secondary actions */}
        <div className="mt-4 mb-5">
          <View paddingStart={1} paddingBottom={1}>
            <Text variant="caption-2" color="neutral-faded" weight="medium">
              Configure
            </Text>
          </View>
          <View direction="column" gap={0}>
            {secondaryActions.map((action) => (
              <ActionButton
                key={action.id}
                action={action}
                variant="secondary"
              />
            ))}
          </View>
        </div>

        <Divider color="neutral-faded" />

        {/* learn the ide section */}
        <div className="mt-4">
          <View paddingStart={1} paddingBottom={1}>
            <Text variant="caption-2" color="neutral-faded" weight="medium">
              Learn
            </Text>
          </View>
          <View direction="column" gap={0}>
            {learnActions.map((action) => (
              <ActionButton key={action.id} action={action} variant="link" />
            ))}
          </View>
        </div>
      </div>
    </View>
  );
};
