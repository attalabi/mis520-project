import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, BookOpen, LineChart, Compass, ArrowRight } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useState } from 'react'
import { BubbleChat } from 'flowise-embed-react'

export default function PathfinderLanding() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred')
      }

      setMessage(data.message)
      setEmail('')
    } catch (error) {
      console.error('Error:', error)
      setMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 text-sky-900">
      <header className="border-b border-sky-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-sky-600" />
            <span className="text-2xl font-bold text-sky-900">Pathfinder.ai</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="#features" className="text-sm font-medium hover:text-sky-700">
              Features
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-sky-700">
              About
            </Link>
            <Button variant="outline" className="text-sky-600 border-sky-600 hover:bg-sky-50">Sign In</Button>
            <Button className="bg-sky-600 text-white hover:bg-sky-700">Get Started</Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 text-center bg-gradient-to-b from-sky-100 to-sky-50">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4 text-sky-900">Navigate Your Career with AI Precision</h1>
            <p className="text-xl text-sky-700 mb-8 max-w-2xl mx-auto">
              Pathfinder.ai empowers students and early career professionals to discover and pursue their ideal career paths
              using cutting-edge artificial intelligence.
            </p>
            <div className="mb-8 flex justify-center">
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QnJhm29ekg0f15rmGXdy0E7lxK5MCE.png"
                alt="AI robot helping a businessman see future opportunities"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
            <Button size="lg" className="gap-2 bg-sky-600 text-white hover:bg-sky-700">
              Start Your Journey <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-sky-900">Discover Your Path</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-sky-50 border-sky-200">
                <CardHeader>
                  <MapPin className="h-8 w-8 mb-2 text-sky-600" />
                  <CardTitle className="text-sky-900">Skills Mapping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sky-700">
                    AI-powered assessment to identify your strengths and areas for improvement.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-sky-50 border-sky-200">
                <CardHeader>
                  <BookOpen className="h-8 w-8 mb-2 text-sky-600" />
                  <CardTitle className="text-sky-900">Learning Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sky-700">
                    Personalized roadmap with clear milestones to achieve your career goals.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-sky-50 border-sky-200">
                <CardHeader>
                  <LineChart className="h-8 w-8 mb-2 text-sky-600" />
                  <CardTitle className="text-sky-900">Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sky-700">
                    Real-time feedback and analytics to keep you motivated and on track.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-sky-50 border-sky-200">
                <CardHeader>
                  <Compass className="h-8 w-8 mb-2 text-sky-600" />
                  <CardTitle className="text-sky-900">Career Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sky-700">
                    AI-driven suggestions for career paths that align with your skills and passions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-sky-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-sky-900">Ready to Find Your Path?</h2>
              <p className="text-xl text-sky-700 mb-8">
                Join thousands of students and professionals who have discovered their dream careers with Pathfinder.ai
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Input 
                  className="max-w-xs bg-white text-sky-900 border-sky-300" 
                  placeholder="Enter your email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-sky-600 text-white hover:bg-sky-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Get Early Access'}
                </Button>
              </form>
              {message && <p className="mt-4 text-sky-700">{message}</p>}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-sky-900">About Pathfinder.ai</h2>
              <p className="text-sky-700 mb-8">
                Pathfinder.ai is an innovative AI-powered platform designed to guide students and early career
                professionals towards fulfilling career paths. By leveraging advanced machine learning algorithms and
                comprehensive industry data, we provide personalized career recommendations, skill assessments, and
                learning plans tailored to each individual's unique profile and aspirations.
              </p>
              <Button variant="outline" size="lg" className="text-sky-600 border-sky-600 hover:bg-sky-50">
                Learn More About Our Technology
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-sky-200 py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-sky-600">© 2024 Pathfinder.ai. All rights reserved.</p>
            <nav className="flex gap-4">
              <Link href="#" className="text-sm text-sky-600 hover:text-sky-800">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-sky-600 hover:text-sky-800">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-sky-600 hover:text-sky-800">
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      </footer>
      <BubbleChat
        chatflowid="a623ec87-32ec-4e40-a44a-8add89085f5f"
        apiHost="http://localhost:3000"
      />
    </div>
  )
}

