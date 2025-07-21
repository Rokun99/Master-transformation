export interface DayData {
    id: number;
    title: string; 
    subtitle: string;
    introduction: string;
    sections: {
        title: string;
        content: (string | { type: 'list'; items: string[] })[];
    }[];
    exercise: {
        title: string;
        description: string;
        specialFeature?: 'feedback' | 'visualize';
    };
    takeaways: string[];
}

// Data now contains translation keys for the new program
export const courseData: DayData[] = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `course.${i + 1}.title`,
    subtitle: `course.${i + 1}.subtitle`,
    introduction: `course.${i + 1}.introduction`,
    sections: [
        {
            title: `course.${i + 1}.sections.0.title`,
            content: [
                `course.${i + 1}.sections.0.content.0`,
                `course.${i + 1}.sections.0.content.1`,
                `course.${i + 1}.sections.0.content.2`,
                `course.${i + 1}.sections.0.content.3`,
            ]
        }
    ],
    exercise: {
        title: `course.${i + 1}.exercise.title`,
        description: `course.${i + 1}.exercise.description`
    },
    takeaways: [
        `course.${i + 1}.takeaways.0`,
    ]
}));

// Manual adjustments for days with different structures are no longer needed for takeaways.
// The content itself is structured correctly in the locale files.
// We can remove the complex manual adjustments and rely on the locale files directly.

export interface Badge {
    id: string;
    icon: string; // Icon name from Header.tsx
    condition: (completedDays: Set<number>) => boolean;
}

export const gamificationData: { badges: Badge[] } = {
    badges: [
        { id: 'day1', icon: 'sparkles', condition: (completed) => completed.has(1) },
        { id: 'week1', icon: 'award', condition: (completed) => completed.size >= 7 },
        { id: 'halfway', icon: 'flag', condition: (completed) => completed.size >= 15 },
        { id: 'week3', icon: 'rocket', condition: (completed) => completed.size >= 21 },
        { id: 'finish', icon: 'trophy', condition: (completed) => completed.size >= 30 },
        { id: 'journal-pro', icon: 'edit-3', condition: (completed) => completed.size >= 10 },
        { id: 'dna_report', icon: 'brain-circuit', condition: () => false }, // Awarded manually
    ]
};