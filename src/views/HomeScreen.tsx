import type { FC } from "react";
import { View, Text } from "reshaped";
import { RecentProjects } from "../components/RecentProjects/RecentProjects";
import { QuickActions } from "../components/QuickActions/QuickActions";
import { NFIcon } from "../components/NFIcon/NFIcon";

const ICONS = {
  branch: "",
  notification: "󰂚",
} as const;

const TitleBar: FC = () => (
  <div
    className="flex items-center h-[30px] bg-ide-panel border-b border-b-ide-border px-3 shrink-0"
    data-tauri-drag-region
  >
    <div className="w-[68px] shrink-0" />
    <div className="w-[68px] shrink-0" />
  </div>
);

const StatusBar: FC = () => (
  <div className="flex items-center h-[22px] bg-ide-panel border-t border-t-ide-border px-2 shrink-0">
    <div className="flex items-center gap-1.5">
      <NFIcon icon={ICONS.branch} size="xs" className="text-ide-text-muted" />
      <Text variant="caption-2" color="neutral-faded">
        main
      </Text>
    </div>

    <div className="flex-1" />

    <div className="flex items-center gap-3">
      <Text variant="caption-2" color="neutral-faded">
        UTF-8
      </Text>
      <Text variant="caption-2" color="neutral-faded">
        LF
      </Text>
      <div className="flex items-center gap-1">
        <NFIcon
          icon={ICONS.notification}
          size="xs"
          className="text-ide-text-muted"
        />
      </div>
    </div>
  </div>
);

export const HomeScreen: FC = () => {
  return (
    <View direction="column" height="100vh" backgroundColor="elevation-base">
      <TitleBar />

      <View direction="row" grow>
        {/* lp: recent projects */}
        <View width="300px" className="shrink-0">
          <RecentProjects />
        </View>

        {/* rp: quick actions */}
        <View grow backgroundColor="elevation-base">
          <QuickActions />
        </View>
      </View>

      <StatusBar />
    </View>
  );
};
