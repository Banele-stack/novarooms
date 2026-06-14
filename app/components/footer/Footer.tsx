export default function Footer() {
  return (
    <footer className="border-t py-10 px-6 text-center text-sm text-gray-500 bg-white slide-up">
      <div className="max-w-4xl mx-auto">
        <p className="font-medium text-gray-700">
          © {new Date().getFullYear()} Made by NovaApps
        </p>
        <p className="mt-1">Find rooms with confidence.</p>

        <div className="mt-8 text-left bg-gray-50 border rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-3">
            🔒 Stay Safe When Renting
          </h3>

          <ul className="space-y-2 list-disc list-inside text-gray-600">
            <li>Always view the room or property in person before making any payment.</li>
            <li>Never pay a deposit or rent without confirming the place exists.</li>
            <li>Meet the landlord or agent in a safe public place whenever possible.</li>
            <li>Verify the address and ask questions about the property before committing.</li>
            <li>Be cautious of deals that seem too good to be true.</li>
            <li>Do not share sensitive personal or banking information unnecessarily.</li>
            <li>Request a written rental agreement before moving in.</li>
            <li>Report suspicious listings or users to help keep the community safe.</li>
          </ul>

          <p className="mt-4 text-xs text-gray-500">
            Cosmo Rooms provides a platform for listings but cannot guarantee
            the authenticity of every advertiser. Users are responsible for
            conducting their own checks before entering into any agreement.
          </p>
        </div>
      </div>
    </footer>
  );
}

