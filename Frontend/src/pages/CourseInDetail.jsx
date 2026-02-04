import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Star, Clock, BookOpen, Users } from "lucide-react"

export default function CourseInDetail() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/course/get/${id}`)
        setCourse(res.data.detailCoursView)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
        <Skeleton className="h-72 w-full rounded-2xl" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    )
  }

  if (!course) {
    return <div className="text-center py-24 text-lg">Course not found</div>
  }

  return (
    <div className="bg-gradient-to-b from-muted/40 to-background">
      <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <Badge className="w-fit">Premium Course</Badge>
          <h1 className="text-4xl font-bold leading-tight">{course.title}</h1>
          <p className="text-muted-foreground text-lg">{course.description}</p>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2"><Clock size={16}/> 20+ Hours</div>
            <div className="flex items-center gap-2"><BookOpen size={16}/> 15 Modules</div>
            <div className="flex items-center gap-2"><Users size={16}/> 500+ Students</div>
            <div className="flex items-center gap-2 text-yellow-500"><Star size={16}/> 4.8 Rating</div>
          </div>
        </div>

        <Card className="rounded-3xl overflow-hidden shadow-xl">
          <img src={course.image?.url} alt={course.title} className="h-80 w-full object-cover" />
        </Card>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>What you'll learn</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
              <li>Build real-world projects</li>
              <li>Understand core concepts</li>
              <li>Industry best practices</li>
              <li>Hands-on experience</li>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              {course.description}
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-3xl shadow-xl sticky top-24 h-fit">
          <CardContent className="p-6 space-y-5">
            <div className="text-3xl font-bold text-green-600">${course.price}</div>
            <Separator />
            <ul className="text-sm space-y-2">
              <li>✔ Lifetime access</li>
              <li>✔ Certificate of completion</li>
              <li>✔ Downloadable resources</li>
              <li>✔ Full support</li>
            </ul>
            <Button className="w-full rounded-xl text-lg">Enroll Now</Button>
            <Button variant="outline" className="w-full rounded-xl">Add to Wishlist</Button>
            <p className="text-xs text-muted-foreground text-center">
              Created on {new Date(course.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
