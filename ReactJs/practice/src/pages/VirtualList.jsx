import { Virtuoso } from "react-virtuoso";

const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);

export default function VirtualList() {
  return <Virtuoso style={{ height: 400 }} totalCount={items.length} itemContent={(index) => <div style={{ padding: 10, borderBottom: "1px solid #eee" }}>{items[index]}</div>} />;
}
