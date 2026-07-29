import React from "react";

export default function ArchivesLayout({ archive, latest }: { archive: React.ReactNode; latest: React.ReactNode }) {
  return (
    <>
      <div>
        <h1>News Archives</h1>
        <section id="archive-filter">{archive}</section>
        <section id="archive-latest">{latest}</section>
      </div>
    </>
  );
}
