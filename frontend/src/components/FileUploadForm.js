import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import SummaryText from './SummaryText';

const FileUploadForm = () => {
    const initialValues = { file: null };
    const [loading, setLoading] = useState(false);
    const [orignalText, setOrignalText] = useState(null);
    const [summeryText, setSummeryText] = useState(null);

    const validationSchema = Yup.object({
        file: Yup.mixed()
            .required('File is required')
            .test(
                'fileFormat',
                'Invalid file format. Only PDF files are allowed.',
                (value) => value && value.type === 'application/pdf'
            ),
    });

    const onSubmit = async (values) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', values.file);

            const response = await axios.post('http://127.0.0.1:5000/api/upload', formData);
            let jsonData = response.data;

            if (response) {
                setOrignalText(jsonData.original_text);
                setSummeryText(jsonData.resulted_text.summary_text);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <div className='mt-5'>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="file" className="form-label">Upload PDF for Text Summarization</label>
                    <input
                        id="file"
                        name="file"
                        type="file"
                        className="form-control"
                        onChange={(event) => formik.setFieldValue('file', event.target.files[0])}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.file && formik.errors.file ? (
                        <div style={{ color: 'red' }}>{formik.errors.file}</div>
                    ) : null}
                </div>

                <div className={loading ? "displayLoader" : "hideLoader"}>
                    <div className='spinner-border mt-3' role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>

                <div>
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </div>

            </form>

            <SummaryText summeryText={summeryText} orignalText={orignalText} />
        </div>
    );
};

export default FileUploadForm;
