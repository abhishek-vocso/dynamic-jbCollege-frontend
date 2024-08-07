import { displayHeroSection } from "@/lib/data";
import '../styles/HeroSection.module.css';
import { getStrapiBaseUrl } from '../lib/utils';

const HeroSection = async () => {
    const { data } = await displayHeroSection();
    const { attributes } = data;
    // console.log("🎉 Data:", data);

    const apiUrl = getStrapiBaseUrl();
    // console.log("🎉", attributes.HeroImage?.data?.[1]?.attributes?.url);

    // Extract hero image URL based on its structure
    const heroImageUrl1 = attributes.HeroSection.HeroImage?.data?.[0]?.attributes?.url || '';
    const heroImageUrl2 = attributes.HeroSection.HeroImage?.data?.[1]?.attributes?.url || '';
    // console.log("🎉", data.attributes.HeroSection.HeroImage.data);

    return (
        <div className="hero-section">
            <h1>{attributes.HeroSection.HeroHeading}</h1>
            <h2>{attributes.HeroSection.HeroSubheading}</h2>
            {(heroImageUrl1 || heroImageUrl2) && (
                <div>
                    {heroImageUrl1 && (
                        <img
                            src={`${apiUrl}${heroImageUrl1}`}
                            alt="Hero"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    )}
                    {heroImageUrl2 && (
                        <img
                            src={`${apiUrl}${heroImageUrl2}`}
                            alt="Hero"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    )}
                </div>
            )}
            {attributes.HeroButtonText && attributes.HeroButtonURL && (
                <div>
                    <a href={attributes.HeroButtonURL} className="hero-button">
                        {attributes.HeroButtonText}
                    </a>
                </div>
            )}
            {/* Add more sections if needed */}
        </div>
    );
}

export default HeroSection;
