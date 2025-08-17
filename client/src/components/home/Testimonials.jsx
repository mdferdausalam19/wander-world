const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    location: "New York, USA",
    content:
      "The travel experience was absolutely amazing! The team went above and beyond to make our trip memorable.",
    avatar: "AJ",
  },
  {
    id: 2,
    name: "Maria Garcia",
    location: "Madrid, Spain",
    content:
      "Outstanding service and attention to detail. Highly recommend for anyone looking for a hassle-free travel experience.",
    avatar: "MG",
  },
  {
    id: 3,
    name: "James Wilson",
    location: "London, UK",
    content:
      "Great destinations and well-organized tours. The guides were knowledgeable and friendly.",
    avatar: "JW",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-3">
            What Our <span className="text-emerald-600">Travelers</span> Say
          </h2>
          <p className="text-emerald-700">
            Hear from our community of happy travelers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center text-lg font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-emerald-600">
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <p className="text-emerald-800 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
