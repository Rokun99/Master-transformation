
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
                {
                    type: 'list',
                    items: [
                        `course.${i + 1}.sections.0.content.2.items.0`,
                        `course.${i + 1}.sections.0.content.2.items.1`,
                    ]
                }
            ]
        }
    ],
    exercise: {
        title: `course.${i + 1}.exercise.title`,
        description: `course.${i + 1}.exercise.description`
    },
    takeaways: [
        `course.${i + 1}.takeaways.0`,
        `course.${i + 1}.takeaways.1`
    ]
}));

// Manual adjustments for days with different structures
courseData[6].sections[0].content = [ { type: 'list', items: [ `course.7.sections.0.content.0.items.0`, `course.7.sections.0.content.0.items.1` ] } ]; // Day 7
courseData[8].sections[0].content = [ { type: 'list', items: [ `course.9.sections.0.content.0.items.0`, `course.9.sections.0.content.0.items.1`, `course.9.sections.0.content.0.items.2`, `course.9.sections.0.content.0.items.3` ] } ]; // Day 9
courseData[10].sections[0].content = [ `course.11.sections.0.content.0`, { type: 'list', items: [ `course.11.sections.0.content.1.items.0`, `course.11.sections.0.content.1.items.1`, `course.11.sections.0.content.1.items.2`, `course.11.sections.0.content.1.items.3`, `course.11.sections.0.content.1.items.4`, `course.11.sections.0.content.1.items.5`, `course.11.sections.0.content.1.items.6` ] } ]; // Day 11
courseData[13].sections[0].content = [ `course.14.sections.0.content.0` ]; // Day 14
courseData[15].sections[0].content = [ `course.16.sections.0.content.0`, { type: 'list', items: [`course.16.sections.0.content.1.items.0`, `course.16.sections.0.content.1.items.1`, `course.16.sections.0.content.1.items.2`, `course.16.sections.0.content.1.items.3`]} ]; // Day 16
courseData[16].sections[0].content = [ `course.17.sections.0.content.0`, `course.17.sections.0.content.1`, `course.17.sections.0.content.2` ]; // Day 17
courseData[18].sections.push({ title: `course.19.sections.1.title`, content: [`course.19.sections.1.content.0`, { type: 'list', items: [`course.19.sections.1.content.1.items.0`, `course.19.sections.1.content.1.items.1`, `course.19.sections.1.content.1.items.2`] }]}); // Day 19
courseData[29].sections[0].content = [`course.30.sections.0.content.0`, { type: 'list', items: [`course.30.sections.0.content.1.items.0`,`course.30.sections.0.content.1.items.1`,`course.30.sections.0.content.1.items.2`]}]; // Day 30


// Flatten simple structures
[0,1,2,3,4,5,7,9,11,12,14,17,19,20,21,22,23,24,25,26,27,28].forEach(idx => {
    courseData[idx].sections[0].content = courseData[idx].sections[0].content.filter(c => typeof c === 'string');
})
courseData.forEach((day, index) => {
    // A generic way to simplify sections that don't follow complex patterns
    if (![6, 8, 10, 15, 16, 18, 29].includes(index)) { // Days with specific list structures
        day.sections = day.sections.map(section => ({
            ...section,
            content: section.content.filter(c => typeof c === 'string')
        }));
    }
     // A simple fallback for content if it's missing from the generic template
    day.sections = day.sections.map(section => ({
        ...section,
        content: section.content.length > 0 ? section.content : [`course.${index + 1}.sections.0.content.0`]
    }));
});



courseData.sort((a, b) => a.id - b.id);


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
