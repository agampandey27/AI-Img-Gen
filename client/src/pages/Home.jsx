import React, { useEffect, useState } from 'react';
import { Loader, Card, FormField } from '../components';
import Footer from '../components/Footer';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch('https://ai-img-gen-nine.vercel.app/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        } else {
          const errorData = await response.json();
          alert(error);
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = allPosts.filter(post =>
        post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        post.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(allPosts);
    }
  }, [searchText, allPosts]);

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map(post => <Card key={post._id} {...post} />);
    }

    return (
      <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
    );
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#212121] text-[32px]'>The Community Showcase</h1>
        <p className='mt-2 text-[#000000] text-[14px] max-w-[500px]'>
          Browse through a collection of imaginative and visually stunning images generated used by LimeWire A.I!
        </p>
      </div>

      <div className='mt-16'>
        <FormField
          labelName="Search Posts"
          type="text"
          name="text"
          placeholder="Search for posts"
          value={searchText}
          handleChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing results for <span className='text-[#212121]'>{searchText}</span>
              </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards data={filteredPosts} title="No search results found" />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default Home;