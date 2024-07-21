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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store'
import { login } from '@/store/authSlice'
import { loginSchema } from '@/constants/schema'
import { setUser } from '@/store/userSlice'

function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)
    try {
      const response: any = await dispatch(login(values))
      console.log(response)
      if (response.payload.status === 200) {
        const token: string = response.payload.data.token
        document.cookie = `access_token=${token}; path=/;`
        dispatch(
          setUser({ username: 'Dummy User', email: values.email, token })
        )
        toast.success('Login Successful', {
          style: { backgroundColor: 'green', color: 'white' }
        })
        navigate('/')
      } else {
        toast.error(response.payload, {
          style: { backgroundColor: 'red', color: 'white' }
        })
      }
    } catch (error) {
      console.error('Login failed', error)
      toast.error(error.message || 'Login failed', {
        style: { backgroundColor: 'red', color: 'white' }
      })
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <Card className="p-2 w-full max-w-md m-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary mb-2">
            Login
          </CardTitle>
          <CardDescription className="text-gray-500 mb-6">
            Hi, Welcome Back!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <FormMessage className="text-red-500" />
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
                        type="password"
                        className="mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="outline"
                className="w-full py-2 mt-4 bg-primary text-white hover:bg-primary-dark"
              >
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="mt-4 text-center text-gray-400 text-sm">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-primary font-semibold">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
