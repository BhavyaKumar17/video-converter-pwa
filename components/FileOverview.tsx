import React from 'react';
import { VideoItem } from '@/types';

export const FileOverview = ({ videos }: { videos: VideoItem[] }) => {
    return <div
        className="
        grid grid-cols-3
        my-8
        gap-4
      "
    >
        <div
            className="
            p-5
            bg-white
            rounded-2xl
            shadow
          "
        >
            <div
                className="
                text-2xl font-bold
              "
            >{videos.length}</div>
            <div>Files</div>
        </div>
        <div
            className="
            p-4
            rounded-xl
            shadow
          "
        >
            <div
                className="
                text-2xl font-bold
              "
            >
                {videos.filter((v) => v.selected).length}
            </div>
            <div>Selected</div>
        </div>

        <div
            className="
            p-4
            rounded-xl
            shadow
          "
        >
            <div
                className="
                text-2xl font-bold
              "
            >
                {videos.filter((v) => v.status === "completed").length}
            </div>

            <span
                className="
                px-3 py-1
                text-green-700 text-sm
                bg-green-100
                rounded-full
              "
            >
                Completed
            </span>
        </div>
    </div>
}