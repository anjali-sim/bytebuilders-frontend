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
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store'
import { signup } from '@/store/authSlice'
import { formSchema } from '@/constants/schema'
import { toast } from 'sonner'

function Signup() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const { confirmPassword, ...signupData } = values

    try {
    const response = await dispatch(signup(signupData)).unwrap()
    // const response = { message: 'sadada' }
    console.log(response.message)
    navigate('/')
    // try {
      toast.success(response.message, {
        style: { backgroundColor: 'green', color: 'white' }
      })
    } 
    catch (error) {
      console.log(error)
    }

    // if (error.response.status === '400') {
    //   toast.error(response.message, {
    //     style: { backgroundColor: 'red', color: 'white' }
    //   })
    // }
    navigate('/')
    // } catch (error) {
    //   console.error('Signup failed', error)
    //   // toast.error(error?.message || "Signup failed");
    // }
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <Card className="p-8 sm:p-12 w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary mb-2">
            Sign Up
          </CardTitle>
          <CardDescription className="text-gray-500 mb-6">
            Create Your Signup
          </CardDescription>
          <CardDescription className="text-gray-500 mb-6"></CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      className="mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    />
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
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      {...field}
                      className="mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your confirm password"
                      {...field}
                      className="mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="outline"
              className="w-full py-2 mt-4 bg-primary text-white hover:bg-primary-dark"
            >
              Sign Up
            </Button>
            <p className="mt-4 text-center text-gray-700">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold">
                Login
              </Link>
            </p>
            <p className="text-gray-400 text-center">
              By continuing you indicate that you read and agreed to the Terms
              of Use
            </p>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default Signup
