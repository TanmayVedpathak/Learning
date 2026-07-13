import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { postsLoader } from "../../api/postsApi";
import "./skeleton-loading.css";

const SkeletonCard = () => {
  return (
    <article className="post-card">
      <div className="post-image-wrapper">
        <Skeleton height="100%" />
      </div>

      <div className="post-content">
        <div className="post-meta">
          <Skeleton width={80} height={18} />
          <Skeleton width={70} height={18} />
        </div>

        <h2>
          <Skeleton count={2} />
        </h2>

        <p className="excerpt">
          <Skeleton count={3} />
        </p>

        <div className="tags">
          <Skeleton width={70} height={28} borderRadius={999} />
          <Skeleton width={90} height={28} borderRadius={999} />
          <Skeleton width={80} height={28} borderRadius={999} />
        </div>

        <div className="author-row">
          <div className="author-info">
            <Skeleton circle width={42} height={42} />

            <div>
              <Skeleton width={120} height={16} />
              <Skeleton width={80} height={14} />
            </div>
          </div>

          <Skeleton width={70} height={36} borderRadius={999} />
        </div>

        <div className="stats-row">
          <Skeleton width={60} height={16} />
          <Skeleton width={60} height={16} />
          <Skeleton width={60} height={16} />
          <Skeleton width={80} height={16} />
        </div>
      </div>
    </article>
  );
};

const SkeletonLoading = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const data = await postsLoader();

        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="posts-page">
      <div className="posts-header">
        <p className="eyebrow">Latest Articles</p>
        <h1>Explore Developer Posts</h1>
        <p>Learn React, Node.js, TypeScript, performance, API handling, and more.</p>
      </div>

      <div className="posts-grid">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
          : posts.map((post) => (
              <article key={post.id} className="post-card">
                <div className="post-image-wrapper">
                  <img src={post.coverImage} alt={post.title} className="post-image" />

                  {post.isFeatured && <span className="featured-badge">Featured</span>}

                  <span className={`status-badge ${post.status}`}>{post.status}</span>
                </div>

                <div className="post-content">
                  <div className="post-meta">
                    <span>{post.category}</span>
                    <span>{post.readingTime} min read</span>
                  </div>

                  <h2>{post.title}</h2>

                  <p className="excerpt">{post.excerpt}</p>

                  <div className="tags">
                    {post.tags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>

                  <div className="author-row">
                    <div className="author-info">
                      <img src={post.author.avatar} alt={post.author.name} />

                      <div>
                        <strong>{post.author.name}</strong>
                        <p>@{post.author.username}</p>
                      </div>
                    </div>

                    <button className="read-btn">Read</button>
                  </div>

                  <div className="stats-row">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.commentsCount}</span>
                    <span>👁️ {post.views}</span>
                    <span>{post.isBookmarked ? "🔖 Saved" : "📑 Save"}</span>
                  </div>
                </div>
              </article>
            ))}
      </div>
    </section>
  );
};

export default SkeletonLoading;
