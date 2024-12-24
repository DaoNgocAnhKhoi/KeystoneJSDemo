import React from 'react';
import { useQuery, gql } from '@apollo/client';

// GraphQL query để lấy danh sách bài viết
const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content {
        document
      }
      author {
        name
      }
      tags {
        name
      }
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ margin: '2rem' }}>
      <h1>Blog Posts</h1>
      {data.posts.map((post) => (
        <div key={post.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h2>{post.title}</h2>
          <div>
            <strong>Author:</strong> {post.author?.name || 'Unknown'}
          </div>
          <div>
            <strong>Tags:</strong> {post.tags.length > 0 ? post.tags.map(tag => tag.name).join(', ') : 'No Tags'}
          </div>
          <p>
            <strong>Content:</strong> {post.content.document.length > 0 ? 'See detailed content.' : 'No content available.'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
