import React, { useEffect, useState } from 'react'
import RequiredLabel from './RequiredLabel'
import { Dropdown } from 'primereact/dropdown'
import { InputMask } from 'primereact/inputmask'
import ReusableInputField from './ReusableInputField'
import { useFormik } from 'formik';
import axios from "axios";
import { Calendar } from 'primereact/calendar';
import * as Yup from 'yup';
import { Button } from 'primereact/button'

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Client is required'),
    // phoneNumber: Yup.string().required('Address is required'),
    // fax: Yup.string()
    //   .matches(/^\d{10}$/, 'Invalid fax number')
    //   .required('Fax is required'),
    // orgDomains: Yup.string()
    //   .matches(
    //     /^(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
    //     'Invalid web address'
    //   )
    //   .required('Web address is required'),
    // taxClassification: Yup.string().required('Tax Classification is required'),
    // stateOfIncorporation: Yup.string().required('State is required'),
    // ein: Yup.string()
    //   .matches(/^\d{2}-\d{7}$/, 'Invalid EIN format (e.g., XX-XXXXXXX)')
    //   .required('EIN is required'),
});

function CompanyProfile({ onNext, view }) {
    const [options, setOptions] = useState()
    const [options1, setOptions1] = useState()
    const [options2, setOptions2] = useState() 
    const [options3, setOptions3] = useState() 

    useEffect(() => {
        // Fetch options from API using axios
        axios.get('http://localhost:4000/dropdownOptions')
            .then((response) => {
                const getData = response.data.map((user) => ({
                    value: user.value,
                    label: user.lable,
                }));
                setOptions(getData);
            })
            .catch((error) => {
                console.log('Error fetching options:', error);
            });
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            phoneNumber: '',
            fax: '',
            orgDomains: '',
            taxClassification: '',
            stateOfIncorporation: '',
            ein: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onNext("contactDetails", values);
            console.log("Company Profile", values)
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="text-center">
                <h4>Client Profile</h4>
            </div>
            <div className=' flex flex-wrap gap-3 p-fluid'>
                <div className="g-2 mb-3">
                    {/* <RequiredLabel label="Company Name" required />
          <Dropdown
            name="name"
            value={formik.values.name}
            options={options}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="---"
            className={formik.errors.name && formik.touched.name ? 'p-invalid' : ''}
          /> */}
                    <ReusableInputField label="Company Name" required
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="---"
                        className={formik.errors.name && formik.touched.name ? 'p-invalid' : ''}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <small className="p-error">{formik.errors.name}</small>
                    )}
                </div>
                <div className='row mb-3'>
                    <div className="flex-auto col-md-6">
                        <RequiredLabel label="Phone" />
                        <InputMask
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            mask='(999) 999-9999'
                            className={formik.errors.phoneNumber && formik.touched.phoneNumber ? 'p-invalid' : ''}
                        />
                        {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                            <small className="p-error">{formik.errors.phoneNumber}</small>
                        )}
                    </div>
                    <div className="flex-auto col-md-6">
                        <ReusableInputField label="Fax"
                            name="fax"
                            value={formik.values.fax}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="---"
                            className={formik.errors.fax && formik.touched.fax ? 'p-invalid' : ''}
                        />
                        {formik.errors.fax && formik.touched.fax && (
                            <small className="p-error">{formik.errors.fax}</small>
                        )}
                        {/* <ErrorMessage name="fax" component="div" /> */}
                    </div>
                </div>

                <div className='row mb-3'>
                    <div className="flex-auto col-md-6">
                        <RequiredLabel label="Tax Classification" required />
                        <Dropdown
                            name="taxClassification"
                            value={formik.values.taxClassification}
                            options={options}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="---"
                            className={formik.errors.taxClassification && formik.touched.taxClassification ? 'p-invalid' : ''}
                        />
                        {formik.errors.taxClassification && formik.touched.taxClassification && (
                            <small className="p-error">{formik.errors.taxClassification}</small>
                        )}
                    </div>
                    <div className="flex-auto col-md-3">
                        <ReusableInputField label="State of Incorparation"
                            name="stateOfIncorporation"
                            value={formik.values.stateOfIncorporation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="---"
                            className={formik.errors.stateOfIncorporation && formik.touched.stateOfIncorporation ? 'p-invalid' : ''}
                        />
                        {formik.errors.stateOfIncorporation && formik.touched.stateOfIncorporation && (
                            <small className="p-error">{formik.errors.stateOfIncorporation}</small>
                        )}
                    </div>
                    <div className="flex-auto col-md-3">
                        <ReusableInputField label="EIN"
                            required
                            name="ein"
                            value={formik.values.ein}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="---"
                            className={formik.errors.ein && formik.touched.ein ? 'p-invalid' : ''}
                        />
                        {formik.errors.ein && formik.touched.ein && (
                            <small className="p-error">{formik.errors.ein}</small>
                        )}
                    </div>
                </div>

                <div className='row mb-3'>
                    <div className="flex-auto col-md-11">
                        <ReusableInputField label="Web Address(for whitelisting domine)" required
                            name="orgDomains"
                            value={formik.values.orgDomains}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="---"
                            className={formik.errors.orgDomains && formik.touched.orgDomains ? 'p-invalid' : ''}
                        />

                        {formik.errors.orgDomains && formik.touched.orgDomains && (
                            <small className="p-error">{formik.errors.orgDomains}</small>
                        )}
                    </div>
                </div>
            

            </div>
            <div className='p-mt-4 form-btns' >
                <Button label='Next' className=' company-primary-btn' type='submit' />
            </div>
        </form>
    )
}

export default CompanyProfile