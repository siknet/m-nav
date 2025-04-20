import * as MdIcons from 'react-icons/md';

const icons = { ...MdIcons };

export default function DynamicIcon({ iconName }: { iconName: keyof typeof icons }) {
  const IconComponent = icons[iconName];
  if (!IconComponent) return null;
  return <IconComponent />;
}