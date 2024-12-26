import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveCard, FetchCardList, setpage } from '../Store/Action/Card';

const Card = () => {
    const dispatch = useDispatch();
    const StoredData = useSelector((state) => state.finalCardList.value);

    const [loading, setLoading] = useState(true);
    const [postsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);


    const imageUrls = [
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/3861967/pexels-photo-3861967.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/196646/pexels-photo-196646.jpeg?auto=compress&cs=tinysrgb&w=600"
    ];

    const getRandomImage = () => {
        return imageUrls[Math.floor(Math.random() * imageUrls.length)];
    };


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                const data = await response.json();
                dispatch(FetchCardList(data.splice(0, 24)));
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        setTimeout(() => {
            fetchPosts();
            setLoading(false);
        }, 1000);
    }, [dispatch]);

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = StoredData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(StoredData.length / postsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRemoveCard = (id) => {
        dispatch(RemoveCard(id));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-2xl font-bold">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-20 ">
            <h1 className="text-2xl font-bold mb-6 text-center">Posts</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {currentPosts && currentPosts.map((post) => (
                    <div
                        key={post.id}
                        className="relative border border-gray-300 rounded-lg p-6 shadow-lg w-[90%] mx-auto transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        <button
                            className="absolute top-2 right-2 text-red-600 rounded-full w-6 h-6 flex items-center justify-center"
                            onClick={() => handleRemoveCard(post.id)}
                        >
                            &times;
                        </button>
                        <h3 className="text-xl font-bold mb-2">{post.title}...</h3>
                        <p className="text-gray-700 mb-4">{post.body}</p>
                        <p className="text-gray-400 font-bold mb-2">MON,21 DEC 2020 14:57 GMT</p>

                        <img
                            className="h-56 w-30 rounded-md"
                            src={getRandomImage()}
                            alt="Card visual"
                        />
                    </div>
                ))}
            </div>


            <div className="mt-8 flex justify-center items-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`px-4 py-2 text-sm rounded-full ${currentPage === index + 1
                            ? "bg-gray-500 text-white"
                            : "bg-white border border-gray-300 text-gray-700"
                            }`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className={`px-4 py-2 text-sm border border-gray-300 rounded-full ${currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-white"
                        }`}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Card;
