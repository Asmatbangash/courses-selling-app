import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AdminSidebar } from "../components/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = admin?.token;

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("image", data.image[0]);

      const response = await axios.post(
        "http://localhost:4000/api/v1/course/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success(response.data.message);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.error || "Something went wrong"
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl rounded-2xl p-10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Create New Course
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <Label>Course Title</Label>
                  <Input
                    placeholder="Enter course title"
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    rows={4}
                    placeholder="Enter course description"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                </div>

                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    {...register("price", { required: true })}
                  />
                </div>

                <div>
                  <Label>Course Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-5 text-center">
                    <input
                      type="file"
                      id="image"
                      className="hidden"
                      accept="image/*"
                      {...register("image", { required: true })}
                      onChange={(e) =>
                        setPreview(URL.createObjectURL(e.target.files[0]))
                      }
                    />
                    <label htmlFor="image" className="cursor-pointer">
                      <UploadCloud className="mx-auto mb-2" />
                      <p>Click to upload image</p>
                    </label>
                  </div>

                  {preview && (
                    <img
                      src={preview}
                      className="mt-4 h-40 w-full object-cover rounded"
                    />
                  )}
                </div>

                <Button className="w-full text-lg">
                  Create Course
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default CreateCourse;
