import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import brandSymbol from '@/assets/brand-symbol.png';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to email service (Formspree, Netlify Forms, etc.)
    console.log('Form submitted:', formState);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <PageLayout>
      {/* Header */}
      <section className="pt-32 pb-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-gold-gradient mb-4">
            Contact
          </h1>
          <p className="font-cormorant text-xl md:text-2xl text-muted-foreground italic mb-8">
            Reach Out
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <img src={brandSymbol} alt="" className="w-10 h-10 object-contain" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
          <p className="font-cormorant text-lg text-muted-foreground">
            For inquiries, collaborations, or just to say hello.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-6">
        <div className="max-w-xl mx-auto">
          {isSubmitted ? (
            <div className="text-center py-16">
              <img src={brandSymbol} alt="" className="w-12 h-12 mx-auto mb-6 object-contain" />
              <h2 className="font-cinzel text-2xl text-foreground mb-4">
                Message Received
              </h2>
              <p className="font-cormorant text-lg text-muted-foreground">
                Thank you for reaching out. I'll respond as soon as I can.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-cinzel text-xs tracking-wider text-foreground/80">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  className="bg-muted/30 border-border focus:border-primary font-cormorant"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-cinzel text-xs tracking-wider text-foreground/80">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className="bg-muted/30 border-border focus:border-primary font-cormorant"
                  required
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="font-cinzel text-xs tracking-wider text-foreground/80">
                  Subject
                </Label>
                <Select
                  value={formState.subject}
                  onValueChange={(value) => setFormState({ ...formState, subject: value })}
                >
                  <SelectTrigger className="bg-muted/30 border-border font-cormorant">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="collaboration">Collaboration</SelectItem>
                    <SelectItem value="press">Press / Media</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="font-cinzel text-xs tracking-wider text-foreground/80">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className="bg-muted/30 border-border focus:border-primary font-cormorant min-h-40"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-primary-foreground font-cinzel text-sm tracking-wider uppercase transition-all duration-300 hover:bg-primary/90"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center gap-4 py-16">
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <img src={brandSymbol} alt="" className="w-8 h-8 object-contain" />
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      {/* Alternative Contact */}
      <section className="py-12 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-cinzel text-sm tracking-wider uppercase text-primary mb-6">
            Or Reach Me Directly
          </h2>
          <a
            href="mailto:contact@pharaohb.com"
            className="font-cormorant text-lg text-muted-foreground hover:text-primary transition-colors"
          >
            contact@pharaohb.com
          </a>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 px-6 text-center">
        <div className="flex items-center justify-center gap-8 md:gap-12">
          <a
            href="https://youtube.com/@PharaohB-1111"
            target="_blank"
            rel="noopener noreferrer"
            className="font-cinzel text-sm tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            YouTube
          </a>
          <a
            href="https://tiktok.com/@awmoive"
            target="_blank"
            rel="noopener noreferrer"
            className="font-cinzel text-sm tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            TikTok
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="font-cinzel text-sm tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            Instagram
          </a>
        </div>
      </section>

      {/* Footer space */}
      <div className="h-16" />
    </PageLayout>
  );
};

export default Contact;
