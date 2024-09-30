import { Rule } from "antd/es/form";

export const emailRules: Rule[] = [
    { required: true, message: "Please input your email!" },
    { type: "email", message: "Please enter the correct email format!" },
    { pattern: /^\S*$/, message: "Email must not contain spaces!" },
  ];
  
  export const passwordRules: Rule[] = [
    { required: true, message: "Please input your password!" },
    { min: 6, message: "Password must be at least 6 characters!" },
    { pattern: /^\S*$/, message: "Password must not contain spaces!" },
  ];
  
  export const nameRules: Rule[] = [
    { required: true, message: "Please input your name!" },
    { min: 4, message: "Name must be at least 4 characters!" },
    { max: 20, message: "Name must be at most 20 characters!" },
  ]
  
  export const roleRules: Rule[] = [
    { required: true, message: "Please select your role!" },
  ]
  
  export const videoRules: Rule[] = [
    {
      required: true,
      message: "Please input your video link!",
    },
  ]
  
  export const descriptionRules: Rule[] = [
    {
      required: true,
      message: "Please input your description!",
    },
  ]
  
  export const phoneNumberRules: Rule[] = [
    {
      required: true,
      message: "Please input your phone number!",
    },
  ]
  
  export const avatarUrlRules: Rule[] = [
    {
      required: true,
      message: "Please upload your Avatar",
    },
  ]
  
  export const commentRules: Rule[] = [
    { required: true, message: 'Please provide a review' }
  ]
  
  export const ratingRules: Rule[] = [
    { required: true, message: 'Please provide a rating' }
  ]
  
  export const contentRules: Rule[] = [
    { required: true, message: "Please enter the content!" },
    { min: 10, message: "Content must be at least 10 characters!" },
  ]
  
  export const titleRules: Rule[] = [
    { required: true, message: "Please input the title!" }
  ]
  
  export const rejectRules: Rule[] = [
    { required: true, message: "Please provide the reason for rejection" }
  ]