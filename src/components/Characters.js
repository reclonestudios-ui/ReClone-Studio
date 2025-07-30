import React from 'react';
import Section from './Section';
import CharacterCard from './CharacterCard';

const charactersData = [
  {
    id: 1,
    name: 'Kaelen',
    bio: 'A disgraced knight seeking to restore his family\'s honor through vengeance.',
    image: 'https://via.placeholder.com/400x500.png/1a1a1a/B90000?text=Kaelen',
  },
  {
    id: 2,
    name: 'Lyra',
    bio: 'A mysterious sorceress whose fate is intertwined with the ancient bloodlines.',
    image: 'https://via.placeholder.com/400x500.png/1a1a1a/B90000?text=Lyra',
  },
  {
    id: 3,
    name: 'Grak',
    bio: 'A brutal warlord who commands the shadowy forces that destroyed Kaelen\'s kin.',
    image: 'https://via.placeholder.com/400x500.png/1a1a1a/B90000?text=Grak',
  },
];

const Characters = () => {
  return (
    <Section>
      <h2 className="text-center font-cinzel text-4xl md:text-5xl font-bold mb-12 text-white" style={{ textShadow: '0 0 10px #B90000' }}>Characters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {charactersData.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </Section>
  );
};

export default Characters;
