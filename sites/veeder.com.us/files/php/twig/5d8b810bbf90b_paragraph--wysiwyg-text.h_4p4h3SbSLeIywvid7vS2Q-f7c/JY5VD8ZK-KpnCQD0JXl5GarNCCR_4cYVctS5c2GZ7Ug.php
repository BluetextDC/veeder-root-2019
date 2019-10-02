<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* themes/custom/veeder/templates/paragraph/paragraph--wysiwyg-text.html.twig */
class __TwigTemplate_dce48c7f785e8f77677533a336b778503aa0480e94e046651141490e80c71445 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
            'paragraph' => [$this, 'block_paragraph'],
            'content' => [$this, 'block_content'],
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["set" => 40, "block" => 60];
        $filters = ["clean_class" => 50, "escape" => 61, "replace" => 61, "trim" => 61, "raw" => 67];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'block'],
                ['clean_class', 'escape', 'replace', 'trim', 'raw'],
                []
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 40
        $context["paragraph_id"] = ("paragraph-" . $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["paragraph"] ?? null), "id", [], "method")));
        // line 43
        $context["classes"] = [0 => "paragraph", 1 => "space-small", 2 => "pb-0", 3 => "side-sec-wrap", 4 => "wysiwyg-editor-content", 5 =>         // line 49
($context["paragraph_id"] ?? null), 6 => ("paragraph--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed($this->getAttribute(        // line 50
($context["paragraph"] ?? null), "bundle", [])))), 7 => ((        // line 51
($context["view_mode"] ?? null)) ? (((\Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed($this->getAttribute(($context["paragraph"] ?? null), "bundle", []))) . "--") . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(($context["view_mode"] ?? null))))) : (""))];
        // line 59
        echo "
";
        // line 60
        $this->displayBlock('paragraph', $context, $blocks);
    }

    public function block_paragraph($context, array $blocks = [])
    {
        // line 61
        echo "  <section";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["attributes"] ?? null), "addClass", [0 => ($context["classes"] ?? null)], "method")), "html", null, true);
        echo " id=\"";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, twig_replace_filter(twig_trim_filter($this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_wysiwyg_text_id", []), 0, []), "value", []))), " ", "-"), "html", null, true);
        echo "\">
  ";
        // line 62
        $this->displayBlock('content', $context, $blocks);
        // line 73
        echo "  </section>
";
    }

    // line 62
    public function block_content($context, array $blocks = [])
    {
        // line 63
        echo "    <div class=\"container\">
      <div class=\"inner-wrap d-flex flex-wrap\">
        <div class=\"left-side-part\">
          <div class=\"e-desc\">
            ";
        // line 67
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_wysiwyg_text", []), 0, [])));
        echo "
          </div>
        </div>
      </div>
    </div>
  ";
    }

    public function getTemplateName()
    {
        return "themes/custom/veeder/templates/paragraph/paragraph--wysiwyg-text.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  96 => 67,  90 => 63,  87 => 62,  82 => 73,  80 => 62,  73 => 61,  67 => 60,  64 => 59,  62 => 51,  61 => 50,  60 => 49,  59 => 43,  57 => 40,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/custom/veeder/templates/paragraph/paragraph--wysiwyg-text.html.twig", "E:\\inetpub\\wwwroot\\d8local.veeder.com\\themes\\custom\\veeder\\templates\\paragraph\\paragraph--wysiwyg-text.html.twig");
    }
}
