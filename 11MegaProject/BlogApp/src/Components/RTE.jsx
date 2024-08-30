import React from 'react'
import { Editor } from '@tinymce/tinymce-react';

//it is used to pass the state of this component to the other forms made by react-hook-form
//simply it pass the reference of this input to other forms from where we use to give input 
import { Controller } from 'react-hook-form';


//control -> it will paas the control of this component to the function who had called this component
function RTE({name, control, label, defaultvalue = ""}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>
            {label}
        </label>}

        <Controller 
            name = {name || 'content'}
            control={control}

            //is field pe agar kuch v change hota hai to inform kar dena jo isko call kiya hai waki wapas se ye render ho sake
            render={({field: {onChange}}) => (
                <Editor
                    apiKey='h0fx3o3egtcdu37tgfabfcz4xdz21ltjld5hm0hkt0q5zbp6'
                    initialValue={defaultvalue || 'Default'}
                    init={{
                        initialValue: defaultvalue || 'Default',
                        height: 500,
                        menubar: true,
                        //taken from tiny mce
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                          ],
                          toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={onChange}       //editor me kuch v change hoga to field jo hai wo re render hojayega
                />
            )}
        />
    </div>
  )
}

export default RTE
