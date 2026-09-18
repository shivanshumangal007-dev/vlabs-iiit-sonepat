// src/sections/explore/explore.data.ts
import { ALL_EXPERIMENTS as EXPERIMENTS } from '@/experiments';
import { buildSemesters } from '@/experiments/explore';

export type ExploreExperiment = {
  id: string;
  title: string;
  description: string;
  circuitId: string;
  labRoute?: string;
  tags: readonly string[];
};

export type ExploreSubject = {
  id: string;
  title: string;
  description: string;
  circuitId: string;
  experiments: ExploreExperiment[];
};

export type ExploreSemester = {
  id: string;
  label: string;
  subjects: ExploreSubject[];
};

// Semester ordering / display config that ISN'T per-experiment data stays here
export const SEMESTER_ORDER = [1, 2, 3, 4, 5, 6, 7, 8];

export const EXPLORE_SEMESTERS = buildSemesters(EXPERIMENTS, SEMESTER_ORDER);

export const FEATURED_SUBJECT = {
  id: EXPLORE_SEMESTERS[0].subjects[0].experiments[0].id,
  title: EXPLORE_SEMESTERS[0].subjects[0].experiments[0].title,
  description: EXPLORE_SEMESTERS[0].subjects[0].experiments[0].description,
  circuitId: EXPLORE_SEMESTERS[0].subjects[0].experiments[0].circuitId,
  category: EXPLORE_SEMESTERS[0].subjects[0].title,
  tags: EXPLORE_SEMESTERS[0].subjects[0].experiments[0].tags,
  labRoute: EXPLORE_SEMESTERS[0].subjects[0].experiments[0].labRoute,
};

export type ExploreSubjectCard = typeof FEATURED_SUBJECT;


export const ALL_EXPERIMENTS: readonly (ExploreExperiment & { subjectTitle: string; semesterLabel: string })[] =
  EXPLORE_SEMESTERS.flatMap((s) =>
    s.subjects.flatMap((sub) =>
      sub.experiments.map((exp) => ({
        ...exp,
        subjectTitle: sub.title,
        semesterLabel: s.label,
      }))
    )
  );
