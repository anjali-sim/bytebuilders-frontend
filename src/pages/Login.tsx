import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

const formSchema = z.object({
  username: z.string().min(4, {
    message: 'Username must be at least 4 characters.'
  }),
  email: z.string().email({
    message: 'Invalid email address.'
  })
})

function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return (
    <div className=" p-8 h-[100vh] w-[100vw] flex justify-center items-center">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default Login

// import { useEffect } from 'react'
// import { Col, Flex, Form, Row, Typography } from 'antd'
// import { useNavigate } from 'react-router-dom'
// import { AuthPageStyle } from './index.style'
// import Images from '../config/images'
// import { NavDotIcon } from '../components/icons'
// import { Input } from '../components/ant/input'
// import { Button } from '../components/ant/button'
// import { useAppDispatch, useAppSelector } from '../store'
// import { login, resetState } from '../store/authSlice'
// import { notifyError, notifySuccess } from '../utils/notification'

// const { Text, Title } = Typography

// interface LoginFormValues {
//   identifier: string
//   password: string
// }

// function Login() {
//   const [form] = Form.useForm()
//   const navigate = useNavigate()
//   const dispatch = useAppDispatch()
//   const { loading, error, success, message } = useAppSelector(
//     (state) => state.auth
//   )
//   const handleSubmit = (values: LoginFormValues) => {
//     dispatch(login(values))
//   }

//   useEffect(() => {
//     if (error) {
//       notifyError(error)
//     } else if (success) {
//       notifySuccess(message)
//       navigate('/chat')
//     }
//     return () => {
//       dispatch(resetState())
//     }
//   }, [dispatch, navigate, error, success, message])

//   return (
//     <AuthPageStyle>
//       <Row>
//         <Col flex="0 0 41.8%">
//           <div className="leftPanel">
//             <img src={Images.authImg} alt="banner" className="bannerImg" />
//             <Flex className="bannerText" vertical>
//               <Title level={3}>From Small Changes to Big Results</Title>
//               <Text>
//                 At CompassCoach, we focus on transforming habits, not
//                 individuals, through personalized coaching and patented goal
//                 mastery technology, empowering you to achieve lasting wellness
//                 and long-term success.
//               </Text>
//               <NavDotIcon />
//             </Flex>
//           </div>
//         </Col>
//         <Col flex="0 0 58.2%">
//           <Flex className="loginFormContainer" justify="center" align="center">
//             <Flex className="loginForm" vertical gap={30}>
//               <img src={Images.logoIcon} alt="logo" />
//               <Flex vertical>
//                 <Title level={1}>Welcome Back</Title>
//               </Flex>
//               <Form layout="vertical" form={form} onFinish={handleSubmit}>
//                 <Form.Item
//                   label="Email Address or Username"
//                   name="identifier"
//                   required
//                   rules={[
//                     {
//                       required: true,
//                       message: ''
//                     }
//                   ]}
//                 >
//                   <Input placeholder="Enter Email Address or Username" />
//                 </Form.Item>
//                 <Form.Item
//                   label="Password"
//                   name="password"
//                   required
//                   rules={[{ required: true, message: '' }]}
//                 >
//                   <Input.Password placeholder="Enter Password" />
//                 </Form.Item>
//                 <Form.Item>
//                   <Button
//                     block
//                     type="primary"
//                     htmlType="submit"
//                     loading={loading}
//                   >
//                     {loading ? 'Logging In...' : 'Log In'}
//                   </Button>
//                 </Form.Item>
//                 {/* <Flex justify="center">
//                   <Text className="linkText">
//                     Don’t have an account ?{' '}
//                     <Link to="/signup">Register now</Link>
//                   </Text>
//                 </Flex> */}
//               </Form>
//             </Flex>
//             <Flex justify="center" className="copyrightText">
//               <Text className="linkText">
//                 © 2024 CompassCoachGPT, all right reserved{' '}
//                 {/* <Link to="/signup">Terms & conditions</Link>
//                 <Link to="/signup">Privacy policy</Link> */}
//               </Text>
//             </Flex>
//           </Flex>
//         </Col>
//       </Row>
//     </AuthPageStyle>
//   )
// }

// export default Login
