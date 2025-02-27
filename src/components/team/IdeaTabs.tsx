import { Tab } from '@headlessui/react';

interface IdeaTabsProps {
  tabs: {
    title: string;
    content: React.ReactNode;
  }[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

export const IdeaTabs = ({ tabs, selectedIndex, onChange }: IdeaTabsProps) => {
  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={onChange}>
      <Tab.List className="flex space-x-2 rounded-xl bg-gray-100 p-1">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none transition-colors ${
                selected
                  ? 'bg-white text-primary shadow'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
              }`
            }
          >
            {tab.title}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels className="mt-4">
        {tabs.map((tab, index) => (
          <Tab.Panel
            key={index}
            className="rounded-xl focus:outline-none"
          >
            {tab.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}; 