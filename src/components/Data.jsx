import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell } from 'recharts';

const Data = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        const allPosts = response.data;
        const filtered = allPosts.filter(post => post.userId === 1);
        setPosts(allPosts);
        setFilteredPosts(filtered);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const data = [
    { name: 'User 1 Posts', value: filteredPosts.length },
    { name: 'Other Posts', value: posts.length - filteredPosts.length },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div>
      <h1>Data Page</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default Data;
