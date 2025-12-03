import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [age, setAge] = useState(user?.age ?? "");
  const [about, setAbout] = useState(user?.about ?? "");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const getInitials = () => {
    if (!user) return "";
    if (user.name) {
      const parts = user.name.trim().split(" ");
      const initials = parts
        .filter((p) => p.length > 0)
        .slice(0, 2)
        .map((p) => p[0].toUpperCase())
        .join("");
      return initials || user.email.charAt(0).toUpperCase();
    }
    return user.email ? user.email.charAt(0).toUpperCase() : "";
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:4000/api/user/me", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const json = await response.json();

        if (!response.ok) {
          setError(json.error || "Failed to load profile.");
        } else {
          setAge(json.age ?? "");
          setAbout(json.about ?? "");

          const updatedUser = {
            ...user,
            name: json.name,
            email: json.email,
            age: json.age ?? "",
            about: json.about ?? "",
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          dispatch({ type: "LOGIN", payload: updatedUser });
        }
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:4000/api/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          age: age === "" ? null : Number(age),
          about,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Failed to update profile.");
      } else {
        setSuccess("Profile updated successfully.");
        const updatedUser = {
          ...user,
          name: json.name,
          email: json.email,
          age: json.age ?? "",
          about: json.about ?? "",
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        dispatch({ type: "LOGIN", payload: updatedUser });
      }
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="mt-16 px-4 pb-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md border border-slate-100 rounded-3xl shadow-xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <div className="px-6 pb-8 -mt-12 flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="h-24 w-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-semibold shadow-lg border-4 border-white">
              {getInitials()}
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">
              {user.name || user.email.split("@")[0]}
            </h2>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>

          <form
            onSubmit={handleSave}
            className="flex-1 flex flex-col gap-4 md:ml-8 mt-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Name (unchangeable)
                </label>
                <input
                  type="text"
                  value={user.name || user.email.split("@")[0]}
                  disabled
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 text-sm cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Email (unchangeable)
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 text-sm cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  placeholder="Add your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                About
              </label>
              <textarea
                rows="4"
                placeholder="Tell something about yourself..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none"
              />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex justify-center items-center px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-md hover:bg-blue-700 active:scale-95 transition-transform transition-colors disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
              {loading && (
                <span className="text-xs text-slate-500">
                  Loading your profile...
                </span>
              )}
              {error && (
                <div className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                  {error}
                </div>
              )}
              {success && (
                <div className="text-xs text-green-600 bg-green-50 border border-green-100 px-3 py-2 rounded-lg">
                  {success}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;


