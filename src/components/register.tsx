"use client";
//@ts-nocheck
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import  {useRouter} from "next/navigation";

export function Register() {
  const [aadhar, setAadhar] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mobile, setMobile] = useState("");
  const [family, setFamily] = useState(1);
  const [income, setIncome] = useState(0);
  const [pan, setPan] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState(null);
  const [formSubmitEnabled, setFormSubmitEnabled] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const handleLocationPermission = async () => {
      try {
        const permission = await navigator.permissions.query({ name: "geolocation" });
        if (permission.state === "granted") {
          const position = await new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject)
          );
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setFormSubmitEnabled(true);
        } else {
          console.error("Location permission denied");
        }
      } catch (error) {
        console.error("Error getting location:", error);
        setError("Error getting location. Please try again.");
      }
    };
    handleLocationPermission();
  }, []);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setFormSubmitEnabled(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Error getting location. Please try again.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !surname || !email || !address || !aadhar || !mobile || !family || !pan || !dob || !password || !location) {
      setError("Please fill out all the fields.");
      return;
    }

    const resU = await fetch("/api/userExists", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }); 
    const data = await resU.json();
    if (data.user.exists) {
      setError("User with this email already exists.");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          surname,
          email,
          address,
          aadhar,
          mobile,
          family,
          pan,
          dob,
          password,
          location,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        throw new Error(`Error: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      const forme = e.target;
      forme.reset();
      router.push("/login");
      setError(null);

    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Registration Form</CardTitle>
          <CardDescription>Fill out the form to create a new account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="aadhar">Aadhar Card Number</Label>
              <Input
                id="aadhar"
                type="text"
                pattern="[0-9]{12}"
                placeholder="123456789012"
                value={aadhar}
                onChange={(e) => setAadhar(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="surname">Surname</Label>
              <Input
                id="surname"
                type="text"
                placeholder="Doe"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                pattern="[0-9]{10}"
                placeholder="1234567890"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="family">Family Members</Label>
              <Input
                id="family"
                type="number"
                min="1"
                max="10"
                placeholder="2"
                value={family}
                onChange={(e) => setFamily(parseInt(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="income">Income</Label>
              <Input
                id="income"
                type="number"
                min="0"
                step="1000"
                placeholder="50000"
                value={income}
                onChange={(e) => setIncome(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pan">PAN Card Number</Label>
              <Input
                id="pan"
                type="text"
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                placeholder="ABCDE1234X"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
          </div>
          {location && (
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                type="text"
                value={`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
                readOnly
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={!formSubmitEnabled}>
              Register
            </Button>
          </div>
        </CardContent>
        {error && (
          <CardFooter>
            <p className="text-red-500">{error}</p>
          </CardFooter>
        )}
      </Card>
    </form>
  );
}
