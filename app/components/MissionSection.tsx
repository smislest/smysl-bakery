
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMissionData } from '../../lib/missionData';


export default function MissionSection() {
  const [mission, setMission] = useState<any>(null);

  useEffect(() => {
    getMissionData().then(setMission);
  }, []);

  if (!mission) return null;
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-5xl leading-tight">{mission.title}</h2>
          <p className="text-2xl md:text-4xl leading-tight">{mission.text}</p>
          <div className="pt-8">
            <Link
              href="#products"
              className="inline-block px-12 py-4 bg-brown text-white rounded-full hover:bg-brown/90 transition-colors text-lg font-medium"
            >
              Посмотреть каталог
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
