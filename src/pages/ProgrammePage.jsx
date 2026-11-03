
import { Link, useParams } from "react-router-dom";

const programmes = {
  "student-wellbeing": {
    title: "Student Wellbeing Programme",
    description:
      "Explore mental-health literacy, practical wellbeing strategies, and pathways to appropriate support for students in Lesotho.",
    topics: [
      "Understanding mental health and emotional wellbeing",
      "Recognising stress and developing healthy coping strategies",
      "Supporting a friend with empathy and respect",
      "Understanding when and how to seek professional help",
    ],
  },
};

export default function ProgrammePage() {
  const { programmeId } = useParams();
  const programme = programmes[programmeId];

  if (!programme) {
    return (
      <main className="min-h-screen bg-mhfa-background px-5 py-16 text-mhfa-text">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold">Programme not found</h1>
          <p className="mt-3 text-mhfa-muted">
            We couldn&apos;t find the programme you requested.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex text-mhfa-primary underline"
          >
            Return home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-mhfa-background px-5 py-16 text-mhfa-text">
      <article className="mx-auto max-w-3xl">
        <Link to="/" className="text-sm font-semibold text-mhfa-primary underline">
          ← Back home
        </Link>

        <h1 className="mt-6 text-4xl font-bold">{programme.title}</h1>

        <p className="mt-5 text-lg leading-8 text-mhfa-muted">
          {programme.description}
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          What you&apos;ll explore
        </h2>

        <ul className="mt-5 space-y-4">
          {programme.topics.map((topic) => (
            <li key={topic} className="flex gap-3 leading-7">
              <span aria-hidden="true" className="font-bold text-mhfa-primary">
                ✓
              </span>
              <span>{topic}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/join"
          className="mt-9 inline-flex rounded-xl bg-mhfa-primary px-6 py-3 font-semibold text-white hover:bg-mhfa-dark"
        >
          Register your interest
        </Link>

        <p className="mt-5 text-sm leading-6 text-mhfa-muted">
          This is an educational programme concept. Its content and delivery
          should be reviewed by appropriately qualified mental-health
          professionals before being presented as a formal service.
        </p>
      </article>
    </main>
  );
}
