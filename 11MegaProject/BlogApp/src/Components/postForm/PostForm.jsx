import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../Header/Button'
import Input from '../Header/Input'
import Select from '../Select'
import RTE from '../RTE'
import service from '../../Appwrite/configuration'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm({ post }) {



    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || 'active',
        }
    })


    const navigate = useNavigate()
    //TODO:  user hoga ya nahi check krna hoga

    const userdata = useSelector(state => state.auth.userdata)
    

    const submit = async (data) => {
        if (post) {
            // console.log("old data:: ", post.Title, post.content, post.imageid, post.userid, post.status,);
            // console.log("new data:: ", data, data.title, data.slug, data.content, data.status);


            //file jo ki upload kar rahe hai
            const file = data.image[0] ? await service.uploadfile(data.image[0]) : null

            //post.imageid previous post dega
            //to agar new file aaya hai to purana delete v karna hoga
            if (file) {
                await service.deletefile(post.imageid)
            }

            //ab new wala ko update v karna hoga.
            const updatepost = await service.updatedpost(
                post.$id, {
                Title: data.title ? data.title : post.Title,
                content: data.content ? data.content : post.content,
                imageid: file ? file.$id : post.imageid,
                userid: post.userid,
                status: data.status ? data.status : post.status,
            })

            if (updatepost) {
                navigate(`/post/${updatepost.$id}`)
            }


        }
        else {
            const file = data.image[0];
            if (file) {
                const uploadedFile = await service.uploadfile(file);
                if (uploadedFile) {
                    const fileid = uploadedFile.$id;
                    data.imageid = fileid;
                    // Create post with the file ID
                    
                    const createpost = await service.createpost({
                        Title: data.title,
                        ...data,
                        userid: userdata.$id,
                        name: userdata.name,
                        
                        
                    });
                    if (createpost) {
                        navigate(`/post/${createpost.$id}`);
                    }
                } else {
                    console.error("File upload failed.");
                }
            } else {
                console.log("file is not available");
            }
        }
    }

    const slugtransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            const slug = value.trim().toLowerCase().replace(/ /g, '-')
            setValue('slug', slug)
            return slug;
        }
        else return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                //jo v value hoga usko trandsform kar ke slug ke andar daal dena hai
                setValue('slug', slugtransform(value.title, { shouldValidate: true }))
            }
        })

        //wo jo slug transform chal raha hai watch ke through usko ab band kar do so return unsubscribe
        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugtransform, setValue])

    return (
        <div>
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap m-6 border bg-white rounded-xl border-dashed">
                <div className="md:w-1/2 px-2 mx-auto my-4">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />

                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugtransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />

                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />

                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />

                    {post && (
                        <div className=" w-full mb-4">
                            <img
                                src={service.getfilepreview(post.imageid)}
                                alt={post.title}
                                className="rounded-lg mx-auto"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" bgcolor={post ? "bg-green-500" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PostForm
