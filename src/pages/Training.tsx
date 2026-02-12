import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { mockCourses, type Course } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle2, Play, Filter } from "lucide-react";

const Training = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [catFilter, setCatFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];
  const filtered = catFilter === "All" ? courses : courses.filter((c) => c.category === catFilter);

  const completedCount = courses.filter((c) => c.completed).length;
  const overallProgress = Math.round(courses.reduce((s, c) => s + c.progress, 0) / courses.length);

  const markComplete = (id: string) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, completed: true, progress: 100 } : c)));
    toast({ title: `${t("completed")} ✅` });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b bg-card/80 backdrop-blur px-4 py-3">
        <button onClick={() => navigate("/dashboard")} className="rounded-lg p-2 hover:bg-muted"><ArrowLeft size={20} /></button>
        <h1 className="font-heading text-lg font-bold text-foreground">{t("training")}</h1>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 space-y-6">
        {/* Progress overview */}
        <div className="grid grid-cols-2 gap-3">
          <div className="stat-card border">
            <p className="text-xs text-muted-foreground">{t("progress")}</p>
            <p className="font-heading text-2xl font-bold text-primary">{overallProgress}%</p>
            <div className="mt-2 h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${overallProgress}%` }} />
            </div>
          </div>
          <div className="stat-card border">
            <p className="text-xs text-muted-foreground">{t("completed")}</p>
            <p className="font-heading text-2xl font-bold text-success">{completedCount}/{courses.length}</p>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter size={16} className="text-muted-foreground flex-shrink-0" />
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCatFilter(cat)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ${catFilter === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards */}
        <div className="space-y-3">
          {filtered.map((course, i) => (
            <div key={course.id} className="module-card flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-muted text-2xl">
                {course.thumbnail}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground">{course.title}</h3>
                    <p className="text-xs text-muted-foreground">{course.category} · {course.duration}</p>
                  </div>
                  {course.completed && <CheckCircle2 size={20} className="flex-shrink-0 text-success" />}
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-2 flex-1 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${course.progress}%` }} />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{course.progress}%</span>
                </div>
                {!course.completed && (
                  <div className="mt-2 flex gap-2">
                    <button className="flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      <Play size={12} /> {t("start_learning")}
                    </button>
                    <button onClick={() => markComplete(course.id)}
                      className="rounded-lg bg-success/10 px-3 py-1 text-xs font-medium text-success">
                      {t("mark_complete")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Training;
