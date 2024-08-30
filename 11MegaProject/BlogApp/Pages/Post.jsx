import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../src/Appwrite/configuration";
import Button from "../src/Components/Header/Button";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userdata = useSelector((state) => state.auth.userdata);
    const isAuthor = post && userdata ? post.userid === userdata.$id : false;

    useEffect(() => {
        if (slug) {
            service.getpost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletepost(post.$id).then((status) => {
            if (status) {
                service.deletefile(post.imageid);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 border border-black flex flex-col items-center">
            <div className="w-full max-w-3xl flex flex-col items-center mb-4 relative rounded-xl p-2 ">
                {isAuthor && (
                    <div className="flex justify-center mb-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgcolor="bg-green-500" className="mr-6">
                                Edit
                            </Button>
                        </Link>
                        <Button bgcolor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
                <div className="w-full mb-2 flex justify-center">
                    <h1 className="text-2xl underline font-bold text-center">{post.Title}</h1>
                </div>
                <div className="w-full mb-4 flex justify-center">
                    <img
                        src={service.getfilepreview(post.imageid)}
                        alt={post.title}
                        className="rounded-xl w-full max-w-xl"
                    />
                </div>
                <div className="w-full browser-css text-center mt-4">
                    {parse(post.content)}
                </div>
            </div>
        </div>
    ) : null;
}
