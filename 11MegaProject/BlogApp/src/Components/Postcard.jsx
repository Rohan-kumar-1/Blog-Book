import React from 'react';
import service from '../Appwrite/configuration';
import { Link } from 'react-router-dom';


function Postcard({ $id, title, imageid, content, flex="flex-row", bgcolor='bg-slate-300'}) {
    const imageURL = service.getfilepreview(imageid);

    return (
        <div className='w-full'>
            <Link to={`/post/${$id}`}>
                <div className={`flex flex-col md:${flex} w-full ${bgcolor} rounded-xl p-4 mx-auto mb-10 `}>
                        <div className="w-full flex justify-center mb-4 md:mb-0">
                            <img
                                src={imageURL}
                                alt={title}
                                className="rounded-md object-cover"
                                style={{ width: '100%', height: '500px' }}
                                onError={(e) => console.error('Image load error:', e)}
                            />
                        </div>
                        <div className="w-full flex flex-col items-center">
                            <h2 className="text-2xl font-bold my-2 text-center underline">{title}</h2>
                            <div className="text-center text-xl">{content}</div>
                        </div>
                </div>
            </Link>
        </div>
    );
}

export default Postcard;
