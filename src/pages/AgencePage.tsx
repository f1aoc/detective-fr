import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import { getDetectiveBySlug } from "@/data/detectives";
import { MapPin, Phone, Mail, Globe, Star, BadgeCheck, Building2, Calendar, Crown, ChevronRight } from "lucide-react";

const AgencePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const detective = slug ? getDetectiveBySlug(slug) : undefined;

  if (!detective) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-2">Agence non trouvée</h1>
            <Link to="/detective-prive" className="text-secondary hover:underline">Retour à l'annuaire</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 flex-wrap">
            <Link to="/" className="hover:text-foreground">Accueil</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/detective-prive" className="hover:text-foreground">Annuaire</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={`/detective-prive/${detective.villeSlug}`} className="hover:text-foreground">{detective.ville}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{detective.nom}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="card-elevated rounded-xl p-6 md:p-8">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="font-display text-2xl md:text-3xl font-bold">{detective.nom}</h1>
                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{detective.adresse}, {detective.codePostal} {detective.ville}</span>
                    </div>
                  </div>
                  {detective.premium && (
                    <div className="badge-verified px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-semibold">
                      <Crown className="h-4 w-4" />
                      Premium
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <Star className="h-5 w-5 text-secondary fill-secondary" />
                  <span className="font-bold text-lg">{detective.note}/5</span>
                  <span className="text-muted-foreground">({detective.avis} avis)</span>
                </div>

                <hr className="my-6 border-border" />

                <h2 className="font-display text-xl font-bold mb-3">À propos</h2>
                <p className="text-muted-foreground leading-relaxed">{detective.description}</p>

                <h2 className="font-display text-xl font-bold mt-6 mb-3">Spécialités</h2>
                <div className="flex flex-wrap gap-2">
                  {detective.specialites.map((s) => (
                    <span key={s} className="badge-verified px-3 py-1.5 rounded-full text-sm">{s}</span>
                  ))}
                </div>

                <h2 className="font-display text-xl font-bold mt-6 mb-3">Coordonnées</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-secondary" />{detective.telephone}</div>
                  <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-secondary" />{detective.email}</div>
                  {detective.siteWeb && (
                    <div className="flex items-center gap-2"><Globe className="h-4 w-4 text-secondary" />{detective.siteWeb}</div>
                  )}
                </div>

                <h2 className="font-display text-xl font-bold mt-6 mb-3">Informations légales</h2>
                <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-secondary" />
                    <span className="font-medium">SIRET vérifié :</span>
                    <span className="font-mono">{detective.siret}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-secondary" />
                    <span className="font-medium">Code APE :</span>
                    <span>{detective.codeAPE} — Activités d'enquête</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-secondary" />
                    <span className="font-medium">Création :</span>
                    <span>{new Date(detective.dateCreation).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-secondary" />
                    <span className="font-medium">Statut :</span>
                    <span className="text-secondary font-medium">Entreprise active</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Données officielles INSEE — Base SIRENE</p>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <LeadForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AgencePage;
