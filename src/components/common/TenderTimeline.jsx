import { Timeline } from 'antd';
import React from 'react';

const TenderTimeline = ({ selected }) => {
  return (
    <Timeline>
      {timelines?.map((timeline) => (
        <Timeline.Item
          color={
            selected === timeline.key
              ? 'green'
              : timeline.key < selected
              ? 'blue'
              : 'gray'
          }
          key={timeline.key}
        >
          {timeline.title}
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

const timelines = [
  {
    title: 'Enter basic tender information',
    key: 1
  },
  {
    title: 'Enter tender BOQs (Bill Of Quantity)',
    key: 2
  },
  {
    title: 'Add Sections to BOQs',
    key: 3
  },
  {
    title: 'Add Sections items',
    key: 4
  }
];

export default TenderTimeline;
